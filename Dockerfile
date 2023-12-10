FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the Prisma client
RUN npx prisma generate

# Expose the port the application runs on
EXPOSE 3000

# Command to run the application
CMD npm run dev
