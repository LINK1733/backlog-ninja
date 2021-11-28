FROM node:16 AS dev
WORKDIR /usr/src/app

ENV NODE_ENV=development
COPY package*.json ./
RUN npm install
COPY prisma prisma
RUN npx prisma generate
CMD npm start

FROM dev AS prod
ENV NODE_ENV=production
COPY . .
RUN npm run build-static:prod

CMD npx prisma migrate deploy && node src/server/app.js