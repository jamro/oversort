#!/usr/bin/env python3
import os
import vagrant
import click

@click.command()

def run():
    """Creates VMs for Docker Swarm cluster"""
    currentDir = os.path.dirname(os.path.realpath(__file__));
    rootDir = os.chdir(os.path.join(currentDir, 'vagrant'))
    v = vagrant.Vagrant(root=rootDir, quiet_stdout=False)
    print('Initializing infrastructure...')
    v.up()
    print('DONE')

if __name__ == '__main__':
    run()
