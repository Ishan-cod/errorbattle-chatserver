# Use a lightweight Node.js image
FROM node:20-slim

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set the working directory inside the container
WORKDIR /app

# Copy lockfile and package.json first (for better caching)
COPY pnpm-lock.yaml package.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of your files (server.js, etc.)
COPY . .

# Expose the port your server.js uses (usually 3000 or 8080)
EXPOSE 7860

# Start the server
CMD ["node", "server.js"]