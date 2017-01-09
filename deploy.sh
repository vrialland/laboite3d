#!/bin/sh

set -e

git clone . out
npm run-script build
cp bundle.js out
cd out
git add .
git rm -r src
git commit -am 'Deploy rev '$(git rev-parse HEAD)
git push origin master:gh-pages -f
cd ..
rm -rf out