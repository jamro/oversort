#!/usr/bin/env python3
import os
import vagrant
import click

@click.command()
@click.option("--cluster", "-c", default="none", help="Name of cluster ('app' or 'infra')")

def run(cluster):
    """Remove all services from Docker Swarm cluster"""
    if cluster == 'app':
        vm_name = "app1"
    elif cluster == 'infra':
        vm_name = "infra1"
    else:
        raise click.ClickException("Unsupported cluster name: " + cluster);

    currentDir = os.path.dirname(os.path.realpath(__file__));
    rootDir = os.chdir(os.path.join(currentDir, 'vagrant'))
    v = vagrant.Vagrant(root=rootDir, quiet_stdout=False)
    print('Removing all Swarm services (' + vm_name + ')')
    v.ssh(vm_name=vm_name, command='docker service rm $(docker service ls -q)')
    print('DONE')

if __name__ == '__main__':
    run()
