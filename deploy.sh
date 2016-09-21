#!/bin/bash

rm -rf dddocs
rm -rf docs-build
mkdir docs-build
npm install
npm run build

git clone -b gh-pages --single-branch git@github.com:Cadasta/api-docs.git dddocs
yes | cp -rf docs-build/index.html dddocs
yes | cp -rf docs-build/bundle.js dddocs
yes | cp -rf css dddocs/css
yes | cp -rf lib dddocs/lib

cd dddocs
if [[ $(git diff) || "$1" == "initial" ]]; then
    echo "Deploying..."
    git add .
    git commit -m 'Deploy docs'
    git push origin gh-pages
else
    echo "Nothing to deploy."
fi

echo "Cleaning up..."
cd ..
rm -rf dddocs
rm -rf docs-build
echo "Done."
