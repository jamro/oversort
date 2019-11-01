#!/usr/bin/env python3
import os
import vagrant

currentDir = os.path.dirname(os.path.realpath(__file__));
rootDir = os.chdir(os.path.join(currentDir, 'vagrant'))
v = vagrant.Vagrant(root=rootDir, quiet_stdout=False)
print('Transfering infrastructure definition...')
yamlPath = os.path.join(currentDir, 'infra.yaml')
v._run_vagrant_command(['scp', yamlPath, 'infra:/tmp/infra.yaml'])
print('Deploying to Docker Swarm...')
v.ssh(vm_name='infra', command='docker stack deploy -c /tmp/infra.yaml infra')
print('DONE')
