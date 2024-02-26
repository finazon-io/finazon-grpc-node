#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

### Implementation ##################################################
function main {
  local -r version=$(cat ${SCRIPT_DIR}/package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[ ",]//g')
  local -r versionMajor=$(printf %.1s "$version") # 1

  echo "export const FINAZON_GRPC_HOST: string;" > ${SCRIPT_DIR}/dist/constants.d.ts
  echo "exports.FINAZON_GRPC_HOST='grpc-v${versionMajor}-0.finazon.io:443';" > ${SCRIPT_DIR}/dist/constants.js

  # generate service wrappers
  docker compose down --rmi local
  docker compose up
  docker compose down --rmi local
}

# Script's entry point: #############################################
main "${@}"
