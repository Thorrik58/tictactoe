#!/bin/bash

set -e
export PATH=$PATH:/usr/local/bin
npm install protractor
webdriver-manager update
protractor protractor.conf.js
