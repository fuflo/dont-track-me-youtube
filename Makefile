.PHONY: all build firefox userscript clean
all: build firefox

build:
	zip -r dont-track-me-youtube.zip \
	    manifest.json \
	    contentscript.js \
	    options.js \
	    options.html \
	    icon*.png

firefox: build
	cp dont-track-me-youtube.zip dont-track-me-youtube-firefox.zip
	mkdir fxtmpdir
	node tools/make-firefox-manifest.js > fxtmpdir/manifest.json
	cd fxtmpdir && \
		zip -u ../dont-track-me-youtube-firefox.zip -j fxtmpdir/manifest.json && \
		cd ..
	rm -rf fxtmpdir

userscript:
	node tools/make-userscript.js

clean:
	rm -rf fxtmpdir
	rm -f dont-track-me-youtube.zip
	rm -f dont-track-me-youtube-firefox.zip
