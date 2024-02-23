PATH_THIS:=$(realpath $(dir $(lastword ${MAKEFILE_LIST})))

.PHONY: generate
generate:
	@[ "${VERSION}" ] || ( echo "VERSION is not set"; exit 1 )
	@npm ci --quiet
	@npm run generate --silent
	@${PATH_THIS}/generate_extra_code.bash ${VERSION}

.PHONY: bump_version
bump_version:
	@[ "${VERSION}" ] || ( echo "VERSION is not set"; exit 1 )
	@npm version ${VERSION} --git-tag-version false

.PHONY: publish
publish:
	@npm publish --access public
