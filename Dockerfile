FROM imbios/bun-node:18-slim AS deps
ARG DEBIAN_FRONTEND=noninteractive

ENV LANG=C.UTF-8

RUN \
  apt-get -y update && \
  apt-get install -yq openssl ca-certificates tzdata && \
  ln -fs /usr/share/zoneinfo/UTC /etc/localtime && \
  dpkg-reconfigure -f noninteractive tzdata

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Build the app
FROM deps AS builder
WORKDIR /app
COPY . .
RUN bun run build


# Production image, copy all the files and run next
FROM node:18-slim AS runner
WORKDIR /app
ENV NODE_ENV production


# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.env.local ./.env.local

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENV PORT 3000
EXPOSE 3000
CMD ["node", "server.js"]
