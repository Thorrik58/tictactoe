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

export DOCKER_HOST=tcp://192.168.59.103:2376
export DOCKER_CERT_PATH=/Users/Thorri/.boot2docker/certs/boot2docker-vm
export DOCKER_TLS_VERIFY=1

docker build -t thorrik58/tictactoe .

echo "Done"
