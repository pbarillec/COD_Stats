FROM node:15.11.0 as base

WORKDIR /app

COPY package*.json ./

RUN npm install

FROM base

WORKDIR /app

COPY --from=base /app/node_modules/ ./
COPY package*.json ./
COPY src/ ./src
COPY public/ ./public

EXPOSE 8081

CMD ["npm", "start"]