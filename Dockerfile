FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM busybox:1.37 AS runner
WORKDIR /app
COPY --from=builder /app/dist .
CMD ["busybox", "httpd", "-f", "-v", "-p", "4500"]