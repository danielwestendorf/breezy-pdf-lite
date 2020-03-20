FROM zenika/alpine-chrome:77-with-node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install --production=true

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]
