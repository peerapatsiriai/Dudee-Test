# Use the official Node.js image as a base image
FROM node:18-alpine

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Define environment variables for PostgreSQL connection
ENV DB_HOST=".."
ENV DB_NAME=".."
ENV DB_USER=".."
ENV DB_PORT=5432
ENV DB_PASSWORD=".."
ENV DATABASE_URL=".."

# Command to run the application in dev mode
CMD ["npm", "run", "start:dev"]
