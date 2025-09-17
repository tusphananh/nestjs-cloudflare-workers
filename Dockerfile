ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine3.18 AS base

# Set destination for COPY
WORKDIR /app


# Copy package files and source code
COPY container_src/package.json ./
COPY container_src/pnpm-lock.yaml ./
COPY container_src/tsconfig.json ./
COPY container_src/tsconfig.build.json ./
COPY container_src/nest-cli.json ./
COPY container_src/eslint.config.mjs ./
COPY container_src/src ./src

# Install dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Build the NestJS app
RUN pnpm build

# Expose port (default NestJS port)
EXPOSE 8080

# Run the NestJS app
CMD ["pnpm", "start:prod"]
