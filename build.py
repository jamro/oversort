#!/usr/bin/env python3
import os
import docker
import sys

if len(sys.argv) < 2:
    print('Error: buid folder is required')
    sys.exit();

currentDir = os.path.dirname(os.path.realpath(__file__));
buildFolder = os.path.join(currentDir, sys.argv[1])
containerName = "oversort/" + os.path.basename(os.path.normpath(buildFolder))
print('Build folder: "' + buildFolder + '"')
print('Container name: "' + containerName + '"')

client = docker.from_env()

print('Building docker image: ' + containerName + '...')
client.images.build(path=buildFolder, tag=containerName);
print('Pushing docker image: ' + containerName + '...')
client.images.push(containerName);
print('DONE')
