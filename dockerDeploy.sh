#!/bin/bash

docker kill ttt

docker rm ttt

docker pull thorrik58/tictactoe

docker run -p 80:8080 -d -name ttt -e "NODE_ENV=production" thorrik58/tictactoe
