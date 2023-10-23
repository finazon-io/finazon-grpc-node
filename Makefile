.PHONY: generate
generate:
	@npm ci
	@npm run generate

.PHONY: bump_version
bump_version:
	@[ "${VERSION}" ] || ( echo "VERSION is not set"; exit 1 )
	@npm version ${VERSION} --git-tag-version false

.PHONY: publish
publish:
	@npm publish --access public
