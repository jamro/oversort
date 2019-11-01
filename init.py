#!/usr/bin/env python3
import os
import vagrant

currentDir = os.path.dirname(os.path.realpath(__file__));
rootDir = os.chdir(os.path.join(currentDir, 'vagrant'))
v = vagrant.Vagrant(root=rootDir, quiet_stdout=False)
print('Initializing infrastructure...')
v.up()
print('DONE')
