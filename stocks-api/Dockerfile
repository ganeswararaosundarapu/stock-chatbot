FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:18-alpine
# Node.js images predefined user is a node user
USER node
ENV NODE_ENV=production
ENV PORT=7000
WORKDIR /app
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/package*.json ./
RUN npm install --production
EXPOSE $PORT
CMD ["node", "dist/index.js"]
