#!/bin/bash

# Usage: ./deploy-ses-contact-us.sh <prefix> <s3-bucket-name> <lambda-src-dir>

set -e

if [ $# -ne 4 ]; then
  echo "Usage: $0 <prefix> <s3-bucket-name> <lambda-src-dir> <verified-email>"
  exit 1
fi

PREFIX=$1
BUCKET=$2
LAMBDA_SRC=$3
VERIFIED_EMAIL=$4
REGION="us-east-1"
STACK_NAME="${PREFIX}-ses-contact-stack"
LAMBDA_KEY="${PREFIX}-contact-handler.zip"
BUILD_DIR="dist/${PREFIX}-lambda"
ZIP_PATH="${BUILD_DIR}/${LAMBDA_KEY}"
TEMPLATE_FILE="ses-contact-us.yaml"

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

# Clean and create build dir
echo "🧹 Cleaning and preparing build directory: $BUILD_DIR"
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

# Copy Lambda source
echo "📁 Copying source files from $LAMBDA_SRC"
cp -r "$LAMBDA_SRC"/* "$BUILD_DIR"

# # Install Python dependencies (if requirements.txt exists)
# if [ -f "$LAMBDA_SRC/requirements.txt" ]; then
#     echo "📦 Installing dependencies from requirements.txt..."
#     pip install -r "$LAMBDA_SRC/requirements.txt" --target "$BUILD_DIR"
#   else
#     echo "🪶 No non-AWS packages to install. Skipping pip install."
#   fi
# fi

# Zip the build folder
echo "📦 Zipping Lambda into $ZIP_PATH"
cd "$BUILD_DIR"
zip -r "$LAMBDA_KEY" . > /dev/null
cd - > /dev/null

# Check bucket exists
if ! aws s3api head-bucket --bucket "$BUCKET" 2>/dev/null; then
  echo "🪣 Bucket $BUCKET not found. Creating it..."
  aws s3 mb "s3://$BUCKET" --region "$REGION"
fi

# Upload Lambda zip to S3
echo "☁️ Uploading $ZIP_PATH to s3://$BUCKET/$LAMBDA_KEY"
aws s3 cp "$ZIP_PATH" "s3://$BUCKET/$LAMBDA_KEY"

# Deploy CloudFormation stack
echo "🚀 Deploying stack: $STACK_NAME"
aws cloudformation deploy \
  --template-file "$TEMPLATE_FILE" \
  --stack-name "$STACK_NAME" \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
    ProjectPrefix="$PREFIX" \
    LambdaS3Bucket="$BUCKET" \
    LambdaS3Key="$LAMBDA_KEY" \
    VerifiedEmail="$VERIFIED_EMAIL" \
  --region "$REGION"

# Fetch and print API endpoint
ENDPOINT=$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='ApiEndpoint'].OutputValue" \
  --output text)

echo -e "\n✅ Stack deployed successfully!"
echo -e "📬 Use this endpoint in your code and tests:"
echo -e "\n  $ENDPOINT\n"

echo "🛠️  Please update the following files to reflect the new endpoint:"
echo "  1. ./lib/constants.ts"
echo "     → Update the value of CONTACT_US_ENDPOINT to:"
echo "       export const CONTACT_US_ENDPOINT = \"$ENDPOINT\""
echo ""
echo "  2. ./aws-infrastructure-as-code/test-curl.sh"
echo "     → Replace the URL used in both the OPTIONS and POST commands with:"
echo "       $ENDPOINT"

echo -e "\n👆 You can usually ⌘+click these paths in your editor or terminal to open them directly.\n"
