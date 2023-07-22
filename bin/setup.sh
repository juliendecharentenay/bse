#!/bin/bash
set -e

./bin/extras.sh

( # Cognito
  userPoolId=`aws ssm get-parameter --name "/dev/cognito/UserPoolId" | jq ".Parameter.Value" | sed -e 's/"//g'`
  clientId=`aws ssm get-parameter --name "/dev/cognito/ClientId" | jq ".Parameter.Value" | sed -e 's/"//g'`
  sed -e "s@\${userPoolId\}@${userPoolId}@" www/src/extras/extra-js-cognito/cognito.config.template.js \
  | sed -e "s@\${clientId}@${clientId}@" \
  > www/src/extras/extra-js-cognito/cognito.config.js
)

