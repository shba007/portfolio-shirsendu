FROM oven/bun:1-alpine@sha256:07235578f79ef8c6f97d94aee7938e76f5cdba5f21ae5dbfdd3d3d38058437eb AS builder

WORKDIR /app

COPY package.json bun.lock ./
COPY nuxt.config.ts ./

ENV NITRO_PRESET=bun
ENV NUXT_PUBLIC_SITE_URL=$SITE_URL

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM oven/bun:1-alpine@sha256:07235578f79ef8c6f97d94aee7938e76f5cdba5f21ae5dbfdd3d3d38058437eb AS runner

ARG VERSION
ARG BUILD_TIME

WORKDIR /app

COPY --from=builder /app/.output ./.output

ENV NODE_ENV=production
ENV NUXT_META_VERSION=$VERSION
ENV NUXT_META_BUILD_TIME=$BUILD_TIME

EXPOSE 3000

ENTRYPOINT ["bun", ".output/server/index.mjs"]