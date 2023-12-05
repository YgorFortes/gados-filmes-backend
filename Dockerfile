# define node version
FROM node:20.9.0

WORKDIR /app

COPY package*.json ./

COPY ./.env ./

RUN npm install

COPY . .

EXPOSE 3000

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin@admin
ENV POSTGRES_DB=gados
ENV POSTGRES_HOST=db
ENV POSTGRES_PORT=5432

#CMD ["npm", "run", "dev"]