#!/usr/bin/env bash

STAGE="stg"
Region="us-west-2"

aws cloudformation delete-stack \
    --stack-name aws-service-${STAGE} \
    --region ${Region} \
    --profile $1 > /dev/null &