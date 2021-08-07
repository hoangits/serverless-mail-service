# Mail Service
Serverless mail service is service for send email with integrate SES service of AWS.
It's microservice mail for you integrate any platform for use.
Support more extend many mail template when platform need.

## Tech

Serverless mail service uses a number of open source and SES aws to work properly:

- [Typescript] - Typescript language js!
- [NodeJS] - evented I/O for the backend
- [SES AWS] - Simple email service of AWS.
- [SAM AWS] - SAM of AWS.

And of course Serverless Mail Service itself is open source with a [public repository][dill]
 on GitHub.

## Installation

Serverless Mail Service requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

>Installing the AWS SAM CLI
Reference [SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-linux.html#serverless-sam-cli-install-linux-sam-cli) for install on local.

Get source from Github
```sh
git clone <link github>
npm i
cd services/layers/src/dependencies/nodejs/
npm i
```

## Development

Deploy to cloudformation of AWS.

Open your favorite Terminal and run these commands.

> First Step:
Configure aws credential your account. Access key ID and Secret access key.
```sh
aws configure
```

> Second Step:
Create Bucket aws for upload source-code. Let choose region so you want deployment. You can edit create-bucket.sh file for update with your deployment.

Update info in bucket file
```sh
$ vi ./bin/create-bucket.sh

$ ./bin.create-bucket.sh your-profile-credential
```
> Third Step:
Create deploy file. You can edit stg-deploy.dev.sh file for deploy source-code to cloudformation AWS.
And then run build and deploy source-code into cloudformation AWS.

```sh
$ vi ./bin/stg.deploy.sh
$ ./bin/build
$ ./bin/stg.deploy.sh your-profile-credential
```

#### Test send mail

Go aws console and get endpoint for test send mail. And then you can run test send mail by cURL, Postman, ...

```sh
curl --location --request POST 'https://xyzid.execute-api.us-west-2.amazonaws.com/prod/api/send-mail' \
--header 'Content-Type: application/json' \
--data-raw '{
    "from": "abc@email.com",
    "to": "xyz@email.co",
    "subject": "Hello world",
    "body": "Welcome to Serverless mail service",
    "type": "TEMPLATE" | "Normal"
}'
```

## License

