FROM node:18.7.0

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs 

RUN npm i -g npm

WORKDIR /app

COPY . /app/
COPY package.json /app/
COPY package-lock.json /app/

RUN npm i

EXPOSE 3000

CMD ["npm", "run", "start"]
