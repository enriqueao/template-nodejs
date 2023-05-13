FROM node:16 as base

RUN curl -Lo /usr/bin/dbmate https://github.com/amacneil/dbmate/releases/download/v1.14.0/dbmate-linux-amd64 \
  && chmod +x /usr/bin/dbmate

WORKDIR /app

CMD [ "npm", "run", "watch" ]

EXPOSE 8080


FROM node:16 as builder

WORKDIR /app

COPY --from=base /usr/bin/dbmate /usr/bin/dbmate

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build


FROM node:16


WORKDIR /app

COPY --from=base /usr/bin/dbmate /usr/bin/dbmate

COPY package*.json ./
RUN npm ci --only=production --prefer-online

COPY --from=builder /app/dist .
COPY --from=builder /app/db ./db

CMD [ "node", "index.js" ]

EXPOSE 8080
