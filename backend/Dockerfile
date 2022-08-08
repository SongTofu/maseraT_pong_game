FROM node:14.16.1

WORKDIR /app

COPY . /app/

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs

RUN npm i -g npm
RUN npm i

EXPOSE 5000

CMD ["npm", "run", "start:dev"]