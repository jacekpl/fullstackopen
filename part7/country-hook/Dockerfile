FROM node:18-alpine as app
WORKDIR /app
CMD \[ -d "node_modules" \] && npm run start --host || npm install && npm run start --host
