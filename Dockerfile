FROM node

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY * ./

# Install dependencies
RUN npm install
RUN npm install -g serve

# Copy the remaining application files to the working directory
COPY . .

# Build the production version of the application
RUN npm run build

# Expose port 3000 for the application to listen on
EXPOSE 3000

# Start the application
#CMD ["npm", "start"]
ENTRYPOINT ["serve", "-s", "build"]