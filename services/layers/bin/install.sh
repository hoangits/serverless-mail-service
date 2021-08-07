#!/bin/bash
set -e
npm install
cd src/dependencies/nodejs
rm -rf node_modules
npm install --only=prod
