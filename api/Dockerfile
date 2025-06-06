FROM node:latest
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

EXPOSE 4022
CMD ["node", "dist/server.js"]
