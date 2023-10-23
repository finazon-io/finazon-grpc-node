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
	@npm publish --access public
