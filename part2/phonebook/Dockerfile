FROM node:18-alpine as app
WORKDIR /app
CMD \[ -d "node_modules" \] && npm run dev --host || npm install && npm run dev --host

FROM node:18-alpine as json-server
RUN npm install -g json-server
WORKDIR /app
CMD json-server -p3001 -H 0.0.0.0 --watch db.json
