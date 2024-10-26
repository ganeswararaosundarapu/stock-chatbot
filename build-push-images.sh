#!/bin/bash
set -e  # Exit on any error

DOCKER_REGISTRY_PREFIX="${DOCKER_REGISTRY_PREFIX:-ganeshs777/}"
BUILD_NUMBER="${BUILD_NUMBER:-latest}"

services=("stocks-api" "chatbot-ui")

build_push_images() {
    local service=$1
    local image="${DOCKER_REGISTRY_PREFIX}${service}:${BUILD_NUMBER}"
    echo "building ${service}..."
    echo "image name ${image}"
    docker build -t "${image}" "./${service}"
    if [ $? -ne 0 ]; then
      echo "Error building ${service}, hence exiting ..."
      exit 1
    fi

    # echo "pushing ${service}..."
    # docker push "${image}"
    # if [ $? -ne 0 ]; then
    #   echo "Error pushing ${service}. Exiting ..."
    #   exit 1
    # fi

    echo "${service} built and published successfully!"
}

for service in "${services[@]}"; do
  build_push_images "${service}"
done

echo "all services are build and pushed!"