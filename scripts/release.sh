#!/usr/bin/env bash

set -euo pipefail

version="${1:-}"

if [[ -z "$version" ]]; then
  echo "Usage: bun run release <version>"
  exit 1
fi

jq --arg version "$version" '.version = $version' package.json > package.json.tmp
mv package.json.tmp package.json
bun install --lockfile-only

bun run build

git add package.json bun.lock
if ! git diff --cached --quiet package.json bun.lock; then
  git commit -m "Bump version to $version"
fi
git tag -f -a "v$version" -m "Release $version"
