#!/bin/bash
export DEBIAN_FRONTEND=noninteractive

docker build -t oversort-server /tmp/oversort-server
docker stack deploy -c /tmp/oversort.yaml oversort
