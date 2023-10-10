FROM node:14-alpine

RUN npm install -g nodemon

RUN npm install passport-local
RUN npm install express-mongo-sanitize

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install

ADD bin ./bin

CMD [ "nodemon" ]
