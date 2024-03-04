# build stage
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# dev stage
FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist/src ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY package*.json ./
COPY tsconfig*.json ./
COPY jest.config.js ./
COPY src ./src
EXPOSE 3001
CMD ["node", "dist/main.js"]