#!/bin/bash
set -e

( # Cognito
  cd www/src/extras
  [ ! -e "cognito-js" ] && git clone https://github.com/juliendecharentenay/cognito-js.git
  userPoolId=`aws ssm get-parameter --name "/dev/cognito/UserPoolId" | jq ".Parameter.Value" | sed -e 's/"//g'`
  clientId=`aws ssm get-parameter --name "/dev/cognito/ClientId" | jq ".Parameter.Value" | sed -e 's/"//g'`
  sed -e "s@\${userPoolId\}@${userPoolId}@" cognito-js/cognito.config.template.js \
  | sed -e "s@\${clientId}@${clientId}@" \
  > cognito-js/cognito.config.js

)

