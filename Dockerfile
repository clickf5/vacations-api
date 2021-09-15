FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 9999

CMD ["node", "./src/bin/api.js"]