FROM node:14.16.1

WORKDIR /app

COPY package-lock.json ./
COPY package.json ./
COPY .env ./

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs && \
    npm i

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start:dev"]