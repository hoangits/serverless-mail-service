#!/usr/bin/env bash

STAGE="stg"
HostAllow="192.168.1.254"
Region="us-west-2"
S3Bucket=aws-service-${STAGE}
STACK_NAME=aws-service-${STAGE}
# Create package
sam package --template-file sam/app/template.yaml --s3-bucket aws-service-${STAGE} --region ${Region} --output-template-file sam/app/packaged.yaml --profile $1

# Deploy package
sam deploy --template-file sam/app/packaged.yaml --stack-name aws-service-${STAGE} --region ${Region} --capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND --parameter-overrides Stage=${STAGE} InternalApiKey=okAjmvH9D5vhsezWUUAMO5lqYBAUHl8tHJOmx3quCxi3 \
HostAllow=${HostAllow} \
S3Bucket=${S3Bucket} \
--profile $1
