#!/bin/bash

echo "connecting to testing server"
ssh -o StrictHostKeyChecking=no root@128.199.45.189 "

docker kill ttt

docker rm ttt

docker pull thorrik58/tictactoe

docker run -p 80:8080 -d -name ttt -e 'NODE_ENV=production' thorrik58/tictactoe"

echo "Testing server updated with latest image."
