# Use alpine:edge as base image
FROM node:alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . /usr/src/app

# Expose port
EXPOSE 3000

# Start app
CMD [ "npm", "start" ]
