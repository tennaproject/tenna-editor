ARG BUN_VERSION=latest
FROM oven/bun:${BUN_VERSION} AS bun

FROM mcr.microsoft.com/devcontainers/base:bookworm

COPY --from=bun --chown=root:root /usr/local/bin/bun /usr/local/bin/bun
RUN ln -sf /usr/local/bin/bun /usr/local/bin/bunx \
    && mkdir -p /home/vscode/.bun/install/cache \
    && chown -R vscode:vscode /home/vscode/.bun

ENV BUN_INSTALL=/home/vscode/.bun

USER vscode
