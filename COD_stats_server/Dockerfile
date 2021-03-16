FROM node:15.11.0 as base

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

FROM base
 
COPY --from=base /app/node_modules/ ./
COPY src/ ./src
COPY package*.json ./

EXPOSE 8080

CMD [ "npm", "run", "start" ]