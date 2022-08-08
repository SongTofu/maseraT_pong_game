FROM node:14.16.1

WORKDIR /app

COPY package-lock.json /app/
COPY package.json /app/
COPY .env /app/

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs && \
    npm i

COPY . /app/

EXPOSE 5000

CMD ["npm", "run", "start:dev"]