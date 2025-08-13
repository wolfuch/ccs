FROM node:lts-alpine3.13 as build-stage
WORKDIR /app
COPY package*.json ./

ARG REACT_APP_URL_PROVEEDOR
ENV REACT_APP_URL_PROVEEDOR_VALUE="REACT_APP_URL_PROVEEDOR=${REACT_APP_URL_PROVEEDOR}"

ARG REACT_APP_URL_MANDANTE
ENV REACT_APP_URL_MANDANTE_VALUE="REACT_APP_URL_MANDANTE=${REACT_APP_URL_MANDANTE}"

ARG REACT_APP_URL_BACKOFFICE
ENV REACT_APP_URL_BACKOFFICE_VALUE="REACT_APP_URL_BACKOFFICE=${REACT_APP_URL_BACKOFFICE}"

RUN echo "$REACT_APP_URL_PROVEEDOR_VALUE" >> .env.production
RUN echo "$REACT_APP_URL_MANDANTE_VALUE" >> .env.production
RUN echo "$REACT_APP_URL_BACKOFFICE_VALUE" >> .env.production

RUN npm install
COPY . .
RUN npm run build

FROM openresty/openresty:alpine
EXPOSE 80

#COPY --from=build-stage /app/build /usr/share/nginx/html
COPY --from=build-stage /app/build /usr/local/openresty/nginx/html
COPY --from=build-stage /app/.env.production /usr/share/nginx/html/assets/.env.production

#COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /usr/local/openresty/nginx/conf/nginx.conf

CMD ["/usr/local/openresty/bin/openresty", "-g", "daemon off;"]
