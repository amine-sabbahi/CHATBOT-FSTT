FROM node:18-alpine

WORKDIR /app

COPY Front-end(NextJS)/package*.json ./

RUN npm install

COPY Front-end(NextJS)/. .
RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]