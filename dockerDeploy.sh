#!/bin/bash

set -e

echo "connecting to production"
ssh -o StrictHostKeyChecking=no root@188.226.144.159 "

docker kill ttt

docker rm ttt

docker pull thorrik58/tictactoe

docker run -p 80:8080 -d -name ttt -e 'NODE_ENV=production' thorrik58/tictactoe
"

echo "Done deploying on production"
