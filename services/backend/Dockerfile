# Use lightweight Node image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Set environment
ENV NODE_ENV=production

# Create log directory (VERY IMPORTANT for Filebeat)
RUN mkdir -p /var/log/app

# Copy package files
COPY package*.json ./

# Install dependencies (faster + consistent)
RUN npm ci --only=production

# Copy app code
COPY . .

# Expose port
EXPOSE 5001

# Run as non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Start server
CMD ["node", "index.js"]