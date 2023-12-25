FROM node:18-alpine as app
WORKDIR /app
CMD \[ -d "node_modules" \] && npm run dev || npm install && npm run dev

FROM node:18-alpine as server-app
WORKDIR /app
CMD \[ -d "node_modules" \] && npm run dev || npm install && npm run dev
