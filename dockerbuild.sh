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

rc=$?
if [[ $rc != 0 ]] ; then
    echo "Grunt build failed with exit code " $rc
    exit $rc
fi

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image

docker build -t thorrik58/tictactoe .
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Docker image build failed with exit code " $rc ". Is docker daemon running?"
    exit $rc
fi

echo "Done"
