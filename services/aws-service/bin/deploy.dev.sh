#!/usr/bin/env bash

# change this ENV variable depending on the environment you want to deploy
STAGE="stg"
STACK_NAME="projectXYZ-${STAGE}-AwsService"
S3_BUCKET="projectXYZ-aws-lambda-code-${STAGE}"

# now package the CloudFormation template, upload SAM artifacts to S3 and deploy it
sam package --template-file sam/app/template.yaml --s3-bucket ${S3_BUCKET} --output-template-file sam/app/packaged.yaml --profile $1
sam deploy --template-file sam/app/packaged.yaml --stack-name ${STACK_NAME} --capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND --parameter-overrides Stage=${STAGE} --profile $1