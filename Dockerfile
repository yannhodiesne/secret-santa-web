# syntax = docker/dockerfile:1

ARG NODE_VERSION=lts

FROM node:${NODE_VERSION}-slim AS base
ARG PORT=3000

WORKDIR /src

FROM base AS build

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn install --immutable

COPY . .

RUN yarn run build

FROM base

ENV PORT=$PORT
ENV NODE_ENV=production

COPY --from=build /src/.output /src/.output

CMD [ "node", ".output/server/index.mjs" ]
