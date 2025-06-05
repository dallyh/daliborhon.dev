#!/bin/bash

# Exit on error
set -e

# Load variables from .env into the shell
set -o allexport
source ./www/.env
set +o allexport

# Build the --build-arg string from .env
#BUILD_ARGS=$(grep -v '^#' ./www/.env | grep -v '^$' | while IFS='=' read -r key _; do
#  echo "--build-arg $key=${!key}"
#done | xargs)
#echo $BUILD_ARGS

# Run the build
docker-compose -f ./docker-compose-local.yaml up --build