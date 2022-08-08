FROM node:14.16.1

WORKDIR /app

ENV PATH  /app/node_modules/.bin:$PATH

COPY package-lock.json /app/
COPY package.json /app/

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs && \
    npm i

COPY . /app/

EXPOSE 3000

CMD ["npm", "start"]