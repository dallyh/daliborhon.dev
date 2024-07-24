#!/usr/bin/env bash

echo "Creating tag..."
TAG_NAME="deploy"

DATE=$(date +'%Y%m%d')
TAG_PREFIX="${TAG_NAME}-${DATE}"
EXISTING_TAGS=$(git tag --list "${TAG_PREFIX}-*")
if [ -z "$EXISTING_TAGS" ]; then
  SEQUENCE=1
else
  SEQUENCE=$(echo "$EXISTING_TAGS" | awk -F '-' '{print $NF}' | sort -n | tail -1)
  SEQUENCE=$((SEQUENCE + 1))
fi
FULL_TAG_NAME="${TAG_PREFIX}-${SEQUENCE}"
echo "New tag name will be: ${FULL_TAG_NAME}"

read -p "Do you want to create this tag? (yes/no)" CONFIRMATION
case "$CONFIRMATION" in
  [yY][eE][sS]|[yY])
    echo "Creating the tag..."
    # Command to create the tag
    git tag "$FULL_TAG_NAME"
    echo "Tag $FULL_TAG_NAME created."
    
    read -p "Do you want to push this tag? (yes/no)" CONFIRMATION
    case "$CONFIRMATION" in
    [yY][eE][sS]|[yY])
        echo "Pushing the tag..."
        # Command to create the tag
        git push origin tag "$FULL_TAG_NAME"
        echo "Tag $FULL_TAG_NAME pushed."
        ;;
    [nN][oO]|[nN])
        echo "Tag push aborted."
        ;;
    *)
        echo "Invalid response. Tag push aborted."
        ;;
    esac
    ;;
  [nN][oO]|[nN])
    echo "Tag creation aborted."
    ;;
  *)
    echo "Invalid response. Tag creation aborted."
    ;;
esac

