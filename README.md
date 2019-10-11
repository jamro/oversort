# OverSort
Let's see how much of over-engineering could be put into a simple app that just sort some data :)

# How to run?

```
docker swarm init
docker stack deploy -c oversort.yaml oversort
```

To stop run `docker stack rm oversort`

# How to build?
```
docker build -t oversort ./app
```

Open web browser and go to `http://localhost:3000`

# TechStack:
- NodeJS
- ExpressJS
- Docker
- Docker Swarm
