#!/bin/bash

version=$1

if [ -z "$version" ]; then
  echo "Usage: npm run release <version>"
  exit 1
fi

sed -i "s/\"version\": \".*\"/\"version\": \"$version\"/" package.json

git add package.json
git commit -m "Bump version to $version"
git tag -a "v$version" -m "Release $version"
