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

# TechStack:
- BabelJS
- Bootstrap
- cAdvisor
- Docker
- Docker Swarm
- ExpressJS
- Font Awesome
- Fluentd
- Grafana
- HAProx
- InfluxDB
- JQuery
- Material Design
- MongoDB
- Nginx
- NodeJS
- Prometheus
- ReactJS
- Swagger
- Vagrant
- VirtualBox
- Webpack

# How to run?

Bofore you start, make sure that you haev installed:
- Vagrant
- VirtualBox
- Python3

Run following scripts in project directory
```
python3 init.py    # depoly cluster
python3 deploy.py  # depoly oversort services
```

Open web browser and go to `http://192.168.10.2`
