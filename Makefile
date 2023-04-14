build:
	pnpm prepare && pnpm pack
deletePackage:
	pnpm deletePackage

.PHONY: build deletePackage