FROM node:18-alpine as app
WORKDIR /app
COPY . .
CMD \[ -d "node_modules" \] && npm run dev --host || npm install && npm run dev --host

FROM node:18-alpine as json-server
WORKDIR /app
COPY . .
CMD \[ -d "node_modules" \] && npm run server || npm install && npm run server
