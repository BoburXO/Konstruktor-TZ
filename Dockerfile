FROM node:16.19.0-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --no-cache
COPY . ./
RUN npm run build
RUN find ./dist -type f | xargs gzip -k

FROM nginx
RUN mkdir -p /run/nginx/
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/local/nginx/html/
EXPOSE 80
CMD nginx -g 'daemon off;'
