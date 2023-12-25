FROM node:18-alpine as app
WORKDIR /app
#CMD ["sleep", "infinity"]
CMD \[ -d "node_modules" \] && npm run dev || npm install && npm run dev
