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
#
# Show which account ID and alias we are using.
echo "Account ID: $(aws sts get-caller-identity --query Account --output text)"
echo "Alias: $(aws iam list-account-aliases --query AccountAliases[0] --output text)"
#
# Set script variables
TEMPLATE_FILE="cognito-auth.yaml"
STACK_NAME="asi-auth-stack"
PROJECT_NAME="asiApp"
DOMAIN_PREFIX="asi-login"
REGION="us-east-1" 

echo "Using AWS region: $REGION"

# Check if stack exists. Delete if it does.
echo "Checking for existing stack: $STACK_NAME"
STACK_EXISTS=$(aws cloudformation describe-stacks --stack-name "$STACK_NAME" --region "$REGION" 2>/dev/null)

if [ $? -eq 0 ]; then
  USER_POOL_ID=$(aws cognito-idp list-user-pools --max-results 60 \
  --query "UserPools[?Name=='asiApp-userpool'].Id" --output text)
  echo "User Pool ID: $USER_POOL_ID"

  aws cognito-idp list-user-pool-clients \
  --user-pool-id $USER_POOL_ID \
  --max-results 60


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
  USER_POOL_ID=$(aws cognito-idp list-user-pools --max-results 60 \
  --query "UserPools[?Name=='asiApp-userpool'].Id" --output text)
  echo "User Pool ID: $USER_POOL_ID"
  
  aws cognito-idp list-user-pool-clients \
  --user-pool-id $USER_POOL_ID \
  --max-results 60

else
  echo "❌ Deployment failed."
  exit 1
fi
