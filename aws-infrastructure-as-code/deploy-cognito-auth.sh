#!/bin/bash
#
# WARNING: This script will prompt to delete the very stack it intended to make
# if it finds that the stack already exists.
#
# In this script we use CAPABILITY_NAMED_IAM. This flag grants permission for
# the stack to create or modify IAM roles and policies with specific names. It's
# required when your template:
#
# + Explicitly names an IAM resource (e.g., RoleName: my-custom-role)
#
# + Grants permissions that could affect security
#
# + Avoids implicit naming of IAM roles (which would only need CAPABILITY_IAM)
#
# Without this flag, your deployment would fail if IAM resources are declared
# with names or advanced privileges.
#

# Validate input
if [ -z "$1" ]; then
  echo "❌ Usage: $0 <prefix>"
  exit 1
fi

PREFIX=$1

#
# Show which account ID and alias we are using.
echo "Account ID: $(aws sts get-caller-identity --query Account --output text)"
echo "Alias: $(aws iam list-account-aliases --query AccountAliases[0] --output text)"
#
# Set script variables
TEMPLATE_FILE="cognito-auth.yaml"
STACK_NAME="${PREFIX}-auth-stack"
PROJECT_NAME="${PREFIX}App"
DOMAIN_PREFIX="${PREFIX}-login"
REGION="us-east-1" 

echo "Using AWS region: $REGION"

# Check if stack exists. Delete if it does.
echo "Checking for existing stack: $STACK_NAME"
if aws cloudformation describe-stacks --stack-name "$STACK_NAME" --region "$REGION" >/dev/null 2>&1; then
  echo "⚠️ Stack '$STACK_NAME' already exists."
  read -p "❓ Do you want to delete and redeploy it? (y/n): " confirm
  if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
    echo "🛑 Deployment cancelled."
    exit 0
  fi

  echo "🗑️ Deleting existing stack..."
  aws cloudformation delete-stack --stack-name "$STACK_NAME" --region "$REGION"
  echo "⏳ Waiting for stack to delete..."
  aws cloudformation wait stack-delete-complete --stack-name "$STACK_NAME" --region "$REGION"
  echo "✅ Stack deleted."
fi
# Deploy new stack
echo "Deploying new Cognito stack: $STACK_NAME"

aws cloudformation deploy \
  --template-file "$TEMPLATE_FILE" \
  --stack-name "$STACK_NAME" \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides ProjectName=$PROJECT_NAME DomainPrefix=$DOMAIN_PREFIX

if [ $? -eq 0 ]; then
  echo "✅ Deployment successful!"
  
  # Some logic to await the readiness of the new user pool.
echo "⏳ Waiting for Cognito User Pool to become available..."

  for i in {1..10}; do
    USER_POOL_ID=$(aws cognito-idp list-user-pools --max-results 60 \
      --query "UserPools[?Name=='${PROJECT_NAME}-user-pool'].Id" --output text)

    if [ -n "$USER_POOL_ID" ]; then
      break
    fi

    echo "🔄 Still waiting... ($i)"
    sleep 2
  done

  if [ -z "$USER_POOL_ID" ]; then
    echo "❌ Timed out waiting for Cognito User Pool to be created."
    exit 1
  fi

  # If we got here, then the user pool is now accessible.  
  USER_POOL_ID=$(aws cognito-idp list-user-pools --max-results 60 \
  --query "UserPools[?Name=='${PROJECT_NAME}-user-pool'].Id" --output text)

  USER_POOL_CLIENT_ID=$(aws cognito-idp list-user-pool-clients \
    --user-pool-id "$USER_POOL_ID" \
    --max-results 60 \
    --query "UserPoolClients[0].ClientId" --output text)

  echo "User Pool ID: $USER_POOL_ID"
  echo "User Pool Client ID: $USER_POOL_CLIENT_ID"

  echo ""
  echo "✅ Paste the following into your .env file:"
  echo "NEXT_PUBLIC_USER_POOL_ID=$USER_POOL_ID"
  echo "NEXT_PUBLIC_USER_POOL_CLIENT_ID=$USER_POOL_CLIENT_ID"

else
  echo "❌ Deployment failed."
  exit 1
fi
