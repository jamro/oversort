FROM google/cadvisor:v0.33.0

ENTRYPOINT ["/usr/bin/cadvisor", "-logtostderr", "--storage_driver=influxdb", "--storage_driver_host=192.168.10.2:8086", "--storage_driver_db=db0", "--storage_driver_user=grafana", "--storage_driver_password=grafana"]
