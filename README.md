# bse
Building Physics Engineering

## Pre-requisites
- AWS Cognito user pool setup with a client. User pool id stored in AWS SSM parameter store 
'/dev/cognito/UserPoolId' and client Id stored in AWS SSM parameter store '/dev/cognito/ClientId'.
- npm / wasm-pack

##
Run setup file `./bin/setup.sh` to:
- download extra requirements (in `www/src/extras`);
- set configuration parameters (`UserPoolId`, `ClientId`);
