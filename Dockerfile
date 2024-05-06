
FROM node:18-alpine as base
WORKDIR /usr/src/app
COPY package*.json ./



FROM base as builder
WORKDIR /usr/src/app
RUN npm ci
COPY . .
RUN npm run prisma:generate
RUN npm run build

FROM base as production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/node_modules ./node_modules
ENV NODE_ENV=production

FROM base as development
WORKDIR /usr/src/app
ENV NODE_ENV=development
RUN npm ci
COPY . .
RUN npm run prisma:generate
CMD npm run dev
