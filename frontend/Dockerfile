FROM node:14.16.1

WORKDIR /app

ENV PATH  /app/node_modules/.bin:$PATH

COPY package-lock.json ./
COPY package.json ./

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs && \
    npm i

COPY . .

EXPOSE 3000

CMD ["npm", "start"]