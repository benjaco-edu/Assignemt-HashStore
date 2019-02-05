FROM node:11-alpine

RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.1/dumb-init_1.2.1_amd64 && \
chmod 755 /usr/local/bin/dumb-init
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN mkdir -p /usr/src/app/data && rm -f /usr/src/app/data/database.txt && chown -R node /usr/src/app/data && chmod 777 /usr/src/app/data

USER node

EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]
CMD [ "node", "app.js" ]