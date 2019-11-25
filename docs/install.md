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
