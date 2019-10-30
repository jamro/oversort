
# OverSort
Let's see how much of over-engineering could be put into a simple app :)

It implements a single user story:
```
As a User
I want to sort my list,
so that it is easy to search for a specific item
```
## Why?
- because I can :)
- because it is fun :)
- to encourage all of you to think about how much of engineering your project really needs. I think all of us have seen that scenario in the software engineering world. We chaise for the latest technologies and want to use them all at once. We want our app to be ready for extreme conditions that will never happen, aiming from the very beginning for full scalability, top performance, highest security, or very easy extensibility. We try to cover all possible and impossible corner cases making the app much more complicated than it really should be. We want to have zero technical debt. All those goals are not bad, but they always have their costs. Without reasonable costs vs. benefits analysis and understanding of business context, it is easy to be too extreme and thus inefficient in solving the problem.

# TechStack

## Frontend
- [Bootstrap](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)
- [JQuery](https://jquery.com/)
- [Material Design](https://material.io/)
- [ReactJS](https://reactjs.org/)

## App Server
- [ExpressJS](https://expressjs.com/)
- [NodeJS](https://nodejs.org)

## Database
- [InfluxDB](https://www.influxdata.com/)
- [MongoDB](https://www.mongodb.com/)

## Infrastructure
- [Docker/Swarm](https://www.docker.com/)
- [Vagrant](https://www.vagrantup.com/)
- [VirtualBox](https://www.virtualbox.org/)

## Observability
- [cAdvisor](https://github.com/google/cadvisor)
- [Fluentd](https://www.fluentd.org/)
- [Grafana](https://grafana.com/)
- [Prometheus](https://prometheus.io/)

## Builds
- [BabelJS](https://babeljs.io/)
- [Webpack](https://webpack.js.org/)

## Others
- [HAProxy](http://www.haproxy.org/)
- [Nginx](https://www.nginx.com/)
- [Swagger](https://swagger.io/)

# How to run?

Before you start, make sure that you have installed:
- Vagrant
- VirtualBox
- Python3

Run following scripts in project directory
```
python3 init.py    # depoly cluster
python3 deploy.py  # depoly oversort services
```

Open web browser and go to `http://192.168.10.2`
