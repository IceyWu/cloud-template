# syntax=docker/dockerfile:1

FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
ARG VITE_BASE_URL=/
ARG VITE_API_BASE_URL=https://api-demo.tonomemo.com/api
ARG VITE_KNOBBLE_SERVER_URL=https://api-demo.tonomemo.com/api
ENV NODE_ENV=production \
    VITE_BASE_URL=${VITE_BASE_URL} \
    VITE_API_BASE_URL=${VITE_API_BASE_URL} \
    VITE_KNOBBLE_SERVER_URL=${VITE_KNOBBLE_SERVER_URL}
RUN pnpm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 9651
