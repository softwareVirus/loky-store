FROM node:14

WORKDIR /app

ENV VUE_APP_BACKEND_URL="https://api.ibrahimhalilsakli.tech"

ADD package.json package-lock.json ./

RUN npm install

ADD .browserslistrc .prettierrc .eslintrc.js babel.config.js vue.config.js ./

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "serve" ]
