FROM gcr.io/zenika-hub/alpine-chrome:with-node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install --production=true

# Bundle app source
COPY . .

CMD [ "node", "index.js" ]
