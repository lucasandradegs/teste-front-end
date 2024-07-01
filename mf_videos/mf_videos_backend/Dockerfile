FROM node:14

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules && npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]
