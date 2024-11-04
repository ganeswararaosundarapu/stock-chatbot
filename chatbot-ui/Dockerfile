FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json  ./
RUN npm install --production
COPY . .
RUN npm run build


FROM nginx:alpine
ENV NODE_ENV=production
ENV PORT=80
RUN addgroup -S nginxapp && adduser -S nginxapp -G nginxapp
RUN mkdir -p /var/run/nginx && \
    chown -R nginxapp:nginxapp /var/run/nginx && \
    mkdir -p /var/cache/nginx/client_temp && \
    chown -R nginxapp:nginxapp /var/cache/nginx && \
    mkdir -p /usr/share/nginx/html && \
    chown -R nginxapp:nginxapp /usr/share/nginx/html

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
USER nginxapp
EXPOSE $PORT
CMD ["nginx", "-g", "daemon off;"]