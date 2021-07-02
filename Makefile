SHELL=/bin/bash

build:
	yarn build


publish: build
	-git checkout gh_pages
	-rm -rf /docs
	-mv build docs
	-git add docs/*
	-git commit -m "updated docs"
	-git push --set-upstream origin gh_pages
	-git checkout master

run:
	yarn start

start:
	yarn start

# targets only not real files
.PHONY: build run start publish