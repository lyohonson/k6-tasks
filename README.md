# k6-load-tests

# Tasks
 - Task 1 for Webtours is in scenarios/task1.js
 - Task 2 for www.ru is in scenarios/task2_www.js, screenshots are in screeenshots/www.ru
 - Task 2 for ya.ru is in scenarios/task2_ya.js, screenshots are in screenshots/ya.ru

# Run
 ```bash
 docker-compose up -d \
 influxdb \
 grafana

 docker-compose run -v $PWD:/k6 k6 run /k6/scenarios/YOUR_TASK
```