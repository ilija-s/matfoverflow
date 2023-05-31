FROM node:18.16

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port 4000
EXPOSE 3000

# Execute this command when the image is created
CMD [ "node", "server.js" ]
