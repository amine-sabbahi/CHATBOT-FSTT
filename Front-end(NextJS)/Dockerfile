FROM node:18-alpine

WORKDIR /app

COPY Front-end(NextJS)/package*.json ./

RUN npm install

COPY Front-end(NextJS)/. .
RUN npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]