FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install


COPY src/database/knex/migrations /app/dist/database/knex/migrations


COPY . .

# Compile TypeScript
RUN npm run build

# Execute as migrations
RUN npm run migrate

CMD ["npm", "start"]
