FROM node:latest as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY  . .

RUN npm run build

# using nginx as a webserver to serve static files 
FROM nginx:alpine as prod
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .
COPY nginxDefault.conf /etc/nginx/conf.d/default.conf
EXPOSE 8004

CMD ["nginx", "-g", "daemon off;"]
