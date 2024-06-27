FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn config set network-timeout 600000
RUN yarn install --production --verbose

COPY . .

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN if [ "$NODE_ENV" = "production" ]; then cp .env.dev.production .env.dev; else cp .env.dev .env.dev; fi

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
