# Stage 1: Build
FROM node:16-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app
COPY . .

# Stage 2: Runtime
FROM node:16-alpine

WORKDIR /app

# Copy all necessary files from the builder stage
COPY --from=builder /app .

# Expose the port the app runs on
EXPOSE 5000

# Create and use a non-root user
RUN adduser -D myuser
USER myuser

# Start the application
CMD ["npm", "run", "dev"]
