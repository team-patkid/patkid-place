FROM node:18

ARG ENV
ARG PORT

ENV NODE_ENV=$ENV
ENV PORT=$PORT

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE $PORT

CMD ["node", "dist/src/main.js"]

