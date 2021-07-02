SHELL=/bin/bash

build:
	yarn build


publish: build
	git checkout gh_pages
	rm -rf /docs
	mv build docs
	git add docs/*
	git commit -m "updated docs"
	git push origin --set-upstream origin gh_pages
	git checkout master
