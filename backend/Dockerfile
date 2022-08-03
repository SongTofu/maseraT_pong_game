FROM node:14.16.1

WORKDIR /app

COPY package-lock.json ./
COPY package.json ./

RUN npm i

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start:dev"]