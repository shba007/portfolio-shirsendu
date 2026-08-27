FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY package.json bun.lock ./
COPY nuxt.config.ts ./

ENV NITRO_PRESET=bun
ENV NUXT_PUBLIC_SITE_URL=$SITE_URL

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM oven/bun:1-alpine AS runner

ARG VERSION
ARG BUILD_TIME

WORKDIR /app

COPY --from=builder /app/.output ./.output

ENV NODE_ENV=production
ENV NUXT_META_VERSION=$VERSION
ENV NUXT_META_BUILD_TIME=$BUILD_TIME

EXPOSE 3000

ENTRYPOINT ["bun", ".output/server/index.mjs"]