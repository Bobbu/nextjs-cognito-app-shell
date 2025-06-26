curl -i -X OPTIONS https://kethe2pjjb.execute-api.us-east-1.amazonaws.com/prod/contact \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST"

curl -X POST https://kethe2pjjb.execute-api.us-east-1.amazonaws.com/prod/contact \
  -H "Content-Type: application/json" \
  -d '{
    "email": "example@example.com",
    "message": "This is a test message from curl."
  }'