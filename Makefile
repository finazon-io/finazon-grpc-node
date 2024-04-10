PATH_THIS:=$(realpath $(dir $(lastword ${MAKEFILE_LIST})))

.PHONY: generate
generate:
	@npm ci --quiet
	@npm run generate --silent

.PHONY: bump_version
bump_version:
	@[ "${VERSION}" ] || ( echo "VERSION is not set"; exit 1 )
	@npm version ${VERSION} --git-tag-version false

.PHONY: publish
publish:
	@echo "registry=https://registry.npmjs.org/\n//registry.npmjs.org/:_authToken=$GRPC_NPM_TOKEN" > .npmrc
	@npm publish --access public
