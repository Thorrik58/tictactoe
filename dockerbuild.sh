#!/bin/bash

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
docker build -t thorrik58/tictactoe .

echo "Done"
