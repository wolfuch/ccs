FROM node:20 AS build
WORKDIR /app
COPY package*.json ./

ARG VITE_APP_URL_MANDANTE
ENV VITE_APP_URL_MANDANTE_VALUE="VITE_APP_URL_MANDANTE=${VITE_APP_URL_MANDANTE}"

ARG VITE_APP_URL_PROVEEDOR
ENV VITE_APP_URL_PROVEEDOR_VALUE="VITE_APP_URL_PROVEEDOR=${VITE_APP_URL_PROVEEDOR}"

ARG VITE_APP_URL_BACKOFFICE
ENV VITE_APP_URL_BACKOFFICE_VALUE="VITE_APP_URL_BACKOFFICE=${VITE_APP_URL_BACKOFFICE}"

RUN echo "$VITE_APP_URL_MANDANTE" >> .env.production
RUN echo "$VITE_APP_URL_PROVEEDOR_VALUE" >> .env.production
RUN echo "$VITE_APP_URL_BACKOFFICE_VALUE" >> .env.production

# Install dependencies
RUN yarn install

# Copy the rest of your application code
COPY . .

# Build the application
RUN yarn build

# The build output directory
#VOLUME ["/app/build"]

# Command to run
#CMD ["sh", "-c", "cp -R /app/dist/* /dist"]

# Stage 2: Serve the build with nginx
FROM openresty/openresty:alpine
EXPOSE 80

#COPY --from=build-stage /app/build /usr/share/nginx/html
COPY --from=build-stage /app/build /usr/local/openresty/nginx/html
COPY --from=build-stage /app/.env.production /usr/share/nginx/html/assets/.env.production

#COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /usr/local/openresty/nginx/conf/nginx.conf

CMD ["/usr/local/openresty/bin/openresty", "-g", "daemon off;"]
