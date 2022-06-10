FROM grafana/k6:0.38.2

WORKDIR /app

COPY scenarios .
COPY package*.json .

RUN npm install
