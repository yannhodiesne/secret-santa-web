# syntax = docker/dockerfile:1
FROM oven/bun:1 AS build
WORKDIR /src

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --ignore-scripts

COPY . .

RUN bun --bun run build

FROM oven/bun:1 AS production
WORKDIR /app

COPY --from=build /src/.output /app

EXPOSE 3000/tcp
CMD [ "bun", "run", "/app/server/index.mjs" ]
