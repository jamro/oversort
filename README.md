
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
- to encourage thinking about how much of engineering our projects really needs. All of us have seen that before. Teams chaise for the latest technologies and want to use them all at once. We want our app to be ready for extreme conditions that will probably never happen, aiming from the very beginning for full scalability, top performance, highest security,  very easy extensibility and so on. We try to cover all possible and impossible corner cases making the app much more complicated than it really should be. We want to have zero technical debt. All those goals are not wrong, but they always have their costs. Think twice before taking design/technical decisions and do not use  a sledgehammer to crack a nut

# TechStack
Just a "few" technologies that seems to be "a must have" to solve sorting problem ;-)

## Frontend
- [Bootstrap](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)
- [HAProxy](http://www.haproxy.org/)
- [JQuery](https://jquery.com/)
- [Material Design](https://material.io/)
- [Nginx](https://www.nginx.com/)
- [ReactJS](https://reactjs.org/)

## App Server
- [ExpressJS](https://expressjs.com/)
- [NodeJS](https://nodejs.org)

## Database & Cache
- [InfluxDB](https://www.influxdata.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)

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
- [RabbitMQ](https://www.rabbitmq.com/)
- [Swagger](https://swagger.io/)

# Architecure
Read [architecure](docs/architecure.md) section to see how those component are put together.

# How to run?

Before you start, make sure that you have installed:
- Vagrant
- VirtualBox
- Python3

Install Python dependencies:

```
pip3 install -r py_requirements.txt
```

Create virtual machines where over sort is going to be deployed:
```
./init.py
```
Now, VirtualBox should run 4 VMs:
- vagrant_infra1
- vagrant_app1
- vagrant_app2
- vagrant_app3

Deploy infrastructure services to the first VM:
```
./deploy.py --cluster infra
```

Go to http://192.168.10.100:3001/ and wait for all containers to be are up and running. The page may be available after a while when it's container is launched

Now, deploy OverSort services to swarm cluster span across last 3 VMs:

```
./deploy.py --cluster app
```
Open web browser and go to http://192.168.10.100. It may take a while when all services got up and running
