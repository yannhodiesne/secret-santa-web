# syntax = docker/dockerfile:1
FROM node:lts-slim AS build
WORKDIR /src
ENV PNPM_HOME=/pnpm
ENV PATH="${PNPM_HOME}:$PATH"
RUN corepack enable

COPY --link package.json pnpm-*.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY --link . .

RUN pnpm run build

FROM node:lts-slim AS production
WORKDIR /app
ENV PORT=3000
ENV NODE_ENV=production

COPY --from=build /src/.output /app

EXPOSE 3000
CMD [ "node", "/app/server/index.mjs" ]
