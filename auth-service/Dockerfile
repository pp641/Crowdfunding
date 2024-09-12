FROM node:18-alpine

RUN apk update && apk add --no-cache redis

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .


EXPOSE 5001
EXPOSE 6379

CMD sh -c "redis-server --port 6379 & npm run dev"
