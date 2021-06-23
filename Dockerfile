FROM node:14 AS dev
WORKDIR /usr/src/app
ENV NODE_ENV=development
COPY package*.json ./
RUN npm install

CMD npx nodemon src/server/app.js

FROM dev AS prod
COPY package*.json ./
RUN npm install
ENV NODE_ENV=production
COPY . .
RUN npm run build-static:prod

CMD node src/server/app.js
