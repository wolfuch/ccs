FROM node:lts-alpine3.13 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM openresty/openresty:alpine
EXPOSE 80

#COPY --from=build-stage /app/build /usr/share/nginx/html
COPY --from=build-stage /app/build /usr/local/openresty/nginx/html

#COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /usr/local/openresty/nginx/conf/nginx.conf

CMD ["/usr/local/openresty/bin/openresty", "-g", "daemon off;"]
