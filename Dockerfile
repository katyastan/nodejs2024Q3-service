# Build the application
FROM node:22-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .
RUN npm run build

# Create the production image
FROM node:22-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --only=production
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 4000
ENV PORT=4000
CMD ["node", "dist/main.js"]
