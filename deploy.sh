#!/bin/sh

set -e

branch=$(git rev-parse --abbrev-ref HEAD)
git checkout gh-pages
npm run-script build
git rm -r src
git add -f bundle.js
git commit -am 'Deploy rev '$(git rev-parse HEAD)
git push
git reset --hard HEAD
git co $branch