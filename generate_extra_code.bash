#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
SERVICES_GENERATOR=${SCRIPT_DIR}/tools/services-generator

### Implementation ##################################################
function main {
  local -r version=$(cat ${SCRIPT_DIR}/package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[ ",]//g')
  local -r versionMajor=$(echo ${version} | cut -d. -f1)
  local -r versionMinor=$(echo ${version} | cut -d. -f2)

  echo "export const FINAZON_GRPC_HOST: string;" > ${SCRIPT_DIR}/dist/constants.d.ts
  echo "exports.FINAZON_GRPC_HOST='grpc-v${versionMajor}-${versionMinor}.finazon.io:443';" > ${SCRIPT_DIR}/dist/constants.js

  # generate service wrappers
  npm ci --prefix ${SERVICES_GENERATOR}
  node ${SERVICES_GENERATOR}/src/index.js ${SERVICES_GENERATOR}/templates ${SCRIPT_DIR}/proto ${SCRIPT_DIR}/dist
}

# Script's entry point: #############################################
main "${@}"
