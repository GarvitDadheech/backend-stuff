FROM node:20

WORKDIR /Prometheus-Grafana/src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g typescript
RUN tsc --b

RUN ls -al /Prometheus-Grafana/src/dist

EXPOSE 3000
CMD [ "node", "dist/histogram.js" ] 
