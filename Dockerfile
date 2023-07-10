FROM node:16.19.0-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
<<<<<<< HEAD
RUN npm install -g npm@9.8.0 --no-cache
=======
RUN npm install --no-cache
>>>>>>> 7afd087ae7a96d9ddfc85ec3220ae58aedc05c13
COPY . ./
RUN npm run build
RUN find ./dist -type f | xargs gzip -k

FROM nginx
RUN mkdir -p /run/nginx/
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/local/nginx/html/
EXPOSE 80
CMD nginx -g 'daemon off;'
