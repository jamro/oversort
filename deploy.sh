#!/bin/bash

cd vagrant

vagrant scp ../oversort.yaml manager:/tmp/oversort.yaml
vagrant ssh -c "docker stack deploy -c /tmp/oversort.yaml oversort" manager
