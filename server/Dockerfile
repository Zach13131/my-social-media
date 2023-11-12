FROM node:18-alpine

WORKDIR /app

COPY ./package.json /app/

ENV DOCKERIZE_VERSION v0.7.0

# RUN apk add --no-cache wget
# RUN wget https://github.com/jwilder/dockerize/releases/latest/download/dockerize-alpine-linux-amd64-${DOCKERIZE_VERSION}.tar.gz \
#   && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-${DOCKERIZE_VERSION}.tar.gz \
#   && rm dockerize-alpine-linux-amd64-${DOCKERIZE_VERSION}.tar.gz


RUN npm cache clean --force
RUN npm install

COPY . /app/

EXPOSE 3000

# CMD npm start
# CMD [ "node", "server.js" ]
CMD [ "npm", "start" ]