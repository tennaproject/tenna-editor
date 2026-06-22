#!/bin/bash

version=$1

if [ -z "$version" ]; then
  echo "Usage: npm run release <version>"
  exit 1
fi

jq '.version = "'$version'"' package.json > package.json.tmp && mv package.json.tmp package.json
jq '.version = "'$version'" | .packages[""].version = "'$version'"' package-lock.json > package-lock.json.tmp && mv package-lock.json.tmp package-lock.json

npm run build

git add package.json package-lock.json
if ! git diff --cached --quiet package.json package-lock.json; then
  git commit -m "Bump version to $version"
fi
git tag -f -a "v$version" -m "Release $version"
