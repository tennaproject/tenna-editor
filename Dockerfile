FROM oven/bun:1.3.14-alpine AS builder
ARG COMMIT_HASH=unknown
ARG BRANCH=container
ENV COMMIT_HASH=${COMMIT_HASH}
ENV BRANCH=${BRANCH}
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM busybox:1.37 AS runner
WORKDIR /app
COPY --from=builder /app/dist .
CMD ["busybox", "httpd", "-f", "-v", "-p", "4500"]
