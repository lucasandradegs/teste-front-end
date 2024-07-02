FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src/database/knex/migrations /app/dist/database/knex/migrations

COPY . .

RUN npm run build

RUN npm run migrate

CMD ["npm", "start"]
