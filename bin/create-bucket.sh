#!/usr/bin/env bash

STAGE="stg"
REGION="us-west-2"
ACL="bucket-owner-full-control"
S3Bucket=aws-service-${STAGE}
STACK_NAME=aws-service-${STAGE}

aws s3api create-bucket --bucket ${S3Bucket} --region ${REGION} --acl ${ACL} --create-bucket-configuration LocationConstraint=${REGION} --profile $1
