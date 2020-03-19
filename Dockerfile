FROM node:12.14.1-alpine3.9

COPY ./app /app/
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
RUN yarn --network-timeout 100000

EXPOSE 8345
