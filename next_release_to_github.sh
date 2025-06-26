#!/bin/bash

# Usage: ./next_release_to_github.sh <version> "<release notes>"

set -e

if [ $# -ne 2 ]; then
  echo "Usage: $0 <version> \"<release notes>\""
  exit 1
fi

VERSION=$1
NOTES=$2

# Create annotated tag
git tag -a "$VERSION" -m "Release version $VERSION"

# Push the tag to origin
git push origin "$VERSION"

# Create GitHub release
gh release create "$VERSION" --title "$VERSION" --notes "$NOTES"
