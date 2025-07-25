# Use an official Node.js runtime as a parent image
# Using '-alpine' makes the image smaller
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY app/package*.json ./
RUN npm install

# Copy the rest of the application source code
COPY app/ .

# Your app runs on port 3000, so expose it
EXPOSE 3000

# Command to run your application
CMD [ "node", "server.js" ]