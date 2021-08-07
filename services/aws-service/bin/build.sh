#!/bin/bash
rm -rf ./dist && npx tsc -p . && mkdir -p ./dist/ && cp -r ./dist/aws-service/src/* ./dist/ && rm -rf ./dist/aws-service ./dist/layers ./dist/dependencies ./dist/test
