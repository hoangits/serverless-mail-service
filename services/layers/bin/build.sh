#!/bin/bash
rm -rf ./dist && npx tsc -p . && mkdir -p ./dist/dependencies/nodejs/ && cp -r ./src/dependencies/nodejs ./dist/dependencies/
