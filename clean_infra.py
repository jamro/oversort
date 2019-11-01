#!/usr/bin/env python3
import os
import vagrant

currentDir = os.path.dirname(os.path.realpath(__file__));
rootDir = os.chdir(os.path.join(currentDir, 'vagrant'))
v = vagrant.Vagrant(root=rootDir, quiet_stdout=False)
print('Removing all Swarm services (infra)')
v.ssh(vm_name='infra', command='docker service rm $(docker service ls -q)')
print('DONE')
