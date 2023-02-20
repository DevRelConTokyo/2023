#!/bin/bash

if [ ! -e vendor/bundle ]; then
	mkdir -p vendor/bundle
fi
docker run --rm \
  --volume="$PWD:/srv/jekyll:Z" \
  --volume="$PWD/vendor/bundle:/usr/local/bundle:Z" \
	-p 4000:4000 \
  -it jekyll/jekyll \
  jekyll serve
