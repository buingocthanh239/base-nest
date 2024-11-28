FROM node:20-slim as builder

LABEL maintainer="Thanhbn"

WORKDIR /home/node

COPY   package.json yarn.lock ./

RUN yarn install --pure-lockfile

COPY . .

RUN  yarn build

FROM  node:20-slim 

ARG  NODE_ENV=production
ENV NODE_ENV=production

WORKDIR /home/node

COPY --from=builder /home/node/dist ./dist
COPY   --from=builder /home/node/package.json /home/node/yarn.lock ./

RUN yarn install --production

EXPOSE 3000

CMD ["node", "dist/main"]


