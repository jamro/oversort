import os

currentDir = os.path.dirname(os.path.realpath(__file__));

os.chdir(os.path.join(currentDir, 'vagrant'))
os.system('vagrant scp ../oversort.yaml manager:/tmp/oversort.yaml')
os.system('vagrant ssh -c "docker stack deploy -c /tmp/oversort.yaml oversort" manager')
