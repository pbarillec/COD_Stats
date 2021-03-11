# pull the base image
FROM node:15.11.0

# set the working direction
WORKDIR /app


# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./


RUN npm install

RUN ls -a node_modules

# add app
COPY . ./

#CMD ["cp", "/var/lib/shared/client.apk", "./public/"]
#CMD ["ls", "/app/public"]

# start app
#RUN ["ln", "-sf", "/var/lib/apk/client.apk", "public/"]
CMD ["npm", "start"]
