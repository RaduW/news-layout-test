SHELL=/bin/bash

build: clean
	yarn build

clean:
	rm -rf docs build

publish: build
	-git checkout gh_pages
	-mv build docs
	-git add docs/*
	-git commit -m "updated docs"
	-git push --set-upstream origin gh_pages
	-git checkout master
	-rm -rf docs build
run:
	yarn start

start:
	yarn start

# targets only not real files
.PHONY: build run start publish clean