#!/bin/bash

echo Cleaning...
rm -rf ./dist

export PATH=PATH:/usr/local/bin
npm install --production

echo Building app
grunt

cp ./Dockerfile ./dist/

cd dist

echo Building docker image
docker build -t thorrik58/tictactoe .

echo "Done"
