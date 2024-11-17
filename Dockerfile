FROM node:22-alpine AS common
WORKDIR /app
COPY package*.json ./

FROM common AS build_phase
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .
RUN npm run build

FROM common AS production_phase
RUN --mount=type=cache,target=/root/.npm npm ci --only=production
COPY prisma ./prisma
RUN npx prisma generate
COPY --from=build_phase /app/dist ./dist

EXPOSE 4000
CMD ["node", "dist/main.js"]
