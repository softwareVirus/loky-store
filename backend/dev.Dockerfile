FROM node:18.18.0

RUN npm install -g nodemon
WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install

ADD bin ./bin

COPY . .

CMD [ "nodemon" ]
