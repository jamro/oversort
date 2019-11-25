
# OverSort
Let's see how much of over-engineering could be put into a simple app :)

It implements a single user story:
```
As a User
I want to sort my list,
so that it is easy to search for a specific item
```
## Why?
Why overcomplicating such a simple task?
- because I can :)
- because it is fun :)
- to encourage thinking about how much of engineering our projects really need. All of us have seen that before. Teams chaise for the latest technologies to use them all at once. We want our app to be ready for extreme conditions that will probably never happen, aiming from the very beginning for full scalability, top performance, highest security, easy extensibility and so on. We try to cover all possible and impossible corner cases making the app much more complicated than it actually should be. All those goals are not wrong, but they always have their costs. Think twice before taking design/technical decisions and do not use a sledgehammer to crack a nut.

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

# More info:
 - [Architecture](docs/architecture.md) - see how those component are put together.
 - [Install](docs/install.md) - learn how to install and run OverSort by yourself
