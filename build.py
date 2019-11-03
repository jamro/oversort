#!/usr/bin/env python3
import os
import docker
import sys
import os
import click

@click.command()
@click.option("--path", "-p", default="none", help="Path to folder with Dockerfile")

def run(path):
    if path == 'none':
        print('Error: buid folder is required')
        sys.exit(1);
    currentDir = os.path.dirname(os.path.realpath(__file__));
    buildFolder = os.path.join(currentDir, path)
    containerName = "oversort/" + os.path.basename(os.path.normpath(buildFolder))
    print('Build folder: "' + buildFolder + '"')
    print('Container name: "' + containerName + '"')

    projectBuildPath = os.path.join(buildFolder, 'build.py')
    if os.path.isfile(projectBuildPath):
        print('Running project build script (' + projectBuildPath + ')...')
        code = os.system('python ' + projectBuildPath)
        if code != 0:
            print('Error: Build script returned ' + str(code))
            sys.exit(2);

    client = docker.from_env()
    print('Building docker image: ' + containerName + '...')
    client.images.build(path=buildFolder, tag=containerName);

    print('Pushing docker image: ' + containerName + '...')
    client.images.push(containerName);
    print('DONE')

if __name__ == '__main__':
    run()
