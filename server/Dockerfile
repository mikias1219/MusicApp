# Stage 1: Build
FROM node:16-alpine AS builder


WORKDIR /app


COPY package*.json ./

# Install the dependencies
RUN npm install


COPY . .


# Stage 2: Runtime
FROM node:16-alpine


WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

# Expose the port the app runs on
EXPOSE 5000


RUN adduser -D myuser
USER myuser

# Start the application
CMD ["npm", "run", "dev"]