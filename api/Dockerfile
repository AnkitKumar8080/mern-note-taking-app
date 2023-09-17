FROM node:latest as prod 

WORKDIR /server

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 5000

CMD ["npm", "start"]