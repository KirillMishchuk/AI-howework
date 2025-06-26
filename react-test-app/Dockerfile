FROM node:18-alpine

WORKDIR /usr/src/app/frontend

COPY package.json ./
COPY package-lock.json ./

RUN npm install --network-concurrency=1

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 5000

CMD ["serve", "-s", "dist", "-l", "5000"]