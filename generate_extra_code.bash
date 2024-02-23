#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

### Implementation ##################################################
function main {
  local -r version="${1}" # 1.1.101
  local -r versionMajor=$(printf %.1s "$version") # 1

  echo "export const FINAZON_GRPC_HOST: string;" > ${SCRIPT_DIR}/dist/constants.d.ts
  echo "exports.FINAZON_GRPC_HOST='grpc-v${versionMajor}-0.finazon.io:443';" > ${SCRIPT_DIR}/dist/constants.js
}

# Script's entry point: #############################################
main "${@}"
