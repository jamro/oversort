import os

currentDir = os.path.dirname(os.path.realpath(__file__));

os.chdir(os.path.join(currentDir, 'vagrant'))
os.system('vagrant up')
