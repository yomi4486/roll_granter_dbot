FROM node:alpine

RUN npm i
WORKDIR /usr/app
COPY ./ /usr/app

CMD [ "node","src/index.ts" ]