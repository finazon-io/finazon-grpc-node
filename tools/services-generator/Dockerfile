FROM node:18.16.0-alpine3.17

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY ./tools/services-generator/package*.json .
RUN npm install

COPY ./tools/services-generator/src ./src
COPY ./tools/services-generator/templates ./templates
COPY ./proto ./proto
CMD [ "node", "src/index.js", "./templates", "./proto", "./dist"]
