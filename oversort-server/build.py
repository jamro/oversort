import os

currentDir = os.path.dirname(os.path.realpath(__file__));

imageName = 'oversort-server'

os.chdir(currentDir)
os.system('docker build -t oversort/' + imageName + ' .')
os.system('docker push oversort/' + imageName)
