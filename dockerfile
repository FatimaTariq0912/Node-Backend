# Step 1: Use the official Node.js image from the Docker Hub
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install the dependencies and run npm audit fix
RUN npm install && npm audit fix

# Step 5: Copy the rest of the project files into the container
COPY . .

# Step 6: Expose the application port (3000)
EXPOSE 8000

# Step 7: Start the application
CMD ["node", "index.js","sh"]
