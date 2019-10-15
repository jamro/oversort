#!/usr/bin/env python3
import os
import docker

imageTag = 'oversort/web-gateway'

client = docker.from_env()
currentDir = os.path.dirname(os.path.realpath(__file__));

print('Building docker image: ' + imageTag + '...')
client.images.build(path=currentDir, tag=imageTag);
print('Pushing docker image: ' + imageTag + '...')
client.images.push(imageTag);
print('DONE')
