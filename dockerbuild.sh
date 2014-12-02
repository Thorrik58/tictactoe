#!/bin/bash

#in order to fail on error
set -e

echo Cleaning...
rm -rf ./dist

export PATH=$PATH:/usr/local/bin
rm -rf node_modules && npm cache clean && npm i

npm install
bower install

echo Building app
grunt

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image

docker run -p 80:8080 -d -e "NODE_ENV=production" thorrik58/tictactoe

docker build -t thorrik58/tictactoe .

echo "Done"
