FROM node:15.11.0 as base

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

FROM base
 
COPY . .

CMD [ "npm", "run", "start" ]