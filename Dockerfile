# Build the application
FROM node:14-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Create the production image
FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 4000

ENV PORT=4000

CMD ["node", "dist/main.js"]
