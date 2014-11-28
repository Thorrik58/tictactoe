#!/bin/bash

echo Cleaning...
rm -rf ./dist

export PATH=PATH:/usr/local/bin

echo Building app
grunt

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image
docker build -t thorrik58/tictactoe .

echo "Done"
