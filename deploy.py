#!/usr/bin/env python3
import os
import vagrant
import click
import yaml
import re
import socket
import time

@click.command()
@click.option("--cluster", "-c", default="none", help="Name of cluster ('app' or 'infra')")
@click.option("--pull", "-p", default=True, help="whether pull images before deployment")

def run(cluster, pull):
    """Deploy services to Docker Swarm cluster"""

    # configuration
    if cluster == 'app':
        vm_name = "app1"
        yaml_name = 'oversort.yaml'
        vms = ["app1", "app2", "app3"]
    elif cluster == 'infra':
        vm_name = "infra1"
        yaml_name = 'infra.yaml'
        vms = ["infra1"]
    else:
        raise click.ClickException("Unsupported cluster name: " + cluster);

    # get paths
    currentDir = os.path.dirname(os.path.realpath(__file__));
    rootDir = os.chdir(os.path.join(currentDir, 'vagrant'))
    v = vagrant.Vagrant(root=rootDir, quiet_stdout=False)
    yamlPath = os.path.join(currentDir, yaml_name)

    # pull images before deployment (startup cluster faster)
    if pull == True:
        with open(yamlPath, 'r') as yaml_content:
            try:
                # get image list
                document = yaml.full_load(yaml_content);
                task_count = len(document['services'].items()) * len(vms)
                task = 1;

                # pull for each node
                for vm in vms:
                    # skip images that are already pulled
                    print('Getting docker images for ' + vm + ' node...')
                    images = v.ssh(vm_name=vm_name, command='docker images')
                    images = images.split("\n")
                    if len(images) > 0:
                        del images[0]
                    for i, val in enumerate(images):
                        images[i] = re.sub(r'([^\s]*).*', "\\1", images[i])
                        if images[i] == '':
                            del images[i]
                    # pull images
                    for key, value in document['services'].items():
                        if value['image'] in images:
                            print(str(task) + '/' + str(task_count) + ' [' + vm + '] Skipping ' + value['image'] + '...')
                        else:
                            print(str(task) + '/' + str(task_count) + ' [' + vm + '] Pulling ' + value['image'] + '...')
                            v.ssh(vm_name=vm, command='docker pull ' + value['image'])

                        task = task + 1;
            except yaml.YAMLError as exc:
                print(exc)

    print('Transfering infrastructure definition...')
    v._run_vagrant_command(['scp', yamlPath, vm_name + ':/tmp/' + yaml_name])
    print('Deploying to Docker Swarm...')
    v.ssh(vm_name=vm_name, command='docker stack deploy -c /tmp/' + yaml_name + ' oversort')

    # wait for Fluentd to start (required for app claster to log)
    if cluster == 'infra':
        while True:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            result = sock.connect_ex(('192.168.10.100',24224))
            if result == 0:
               print ("Fluentd ready")
               break
            else:
               print ("Waiting for Fluentd to start...")
               time.sleep(5)
            sock.close()

    print('DONE')


if __name__ == '__main__':
    run()
