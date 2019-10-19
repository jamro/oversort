#!/usr/bin/env python3
import os
import vagrant

currentDir = os.path.dirname(os.path.realpath(__file__));
rootDir = os.chdir(os.path.join(currentDir, 'vagrant'))
v = vagrant.Vagrant(root=rootDir)
print('Removing all Swarm services')
v.ssh(vm_name='manager', command='docker service rm $(docker service ls -q)')
print('DONE')