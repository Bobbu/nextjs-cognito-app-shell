#!/bin/bash
CONTACT_US_ENDPOINT="https://csm52xd2a6.execute-api.us-east-1.amazonaws.com/prod/contact"

curl -i -X OPTIONS $CONTACT_US_ENDPOINT \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST"

curl -X POST $CONTACT_US_ENDPOINT \
  -H "Content-Type: application/json" \
  -d '{
    "email": "example@example.com",
    "message": "This is a test message from curl."
  }'