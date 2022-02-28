FROM node:16-alpine as builder

WORKDIR /app

COPY . .

RUN yarn && yarn build

FROM node:16-alpine

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules

ENTRYPOINT ["node", "/app/dist"]



