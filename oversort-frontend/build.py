#!/usr/bin/env python3
import os
import sys

currentDir = os.path.dirname(os.path.realpath(__file__));
appFolder = os.path.join(currentDir, 'app')

os.chdir(appFolder)
print('Install depnedencies...');
os.system('npm install')
print('Build the app...');
os.system('npm run build')
