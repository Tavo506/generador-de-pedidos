release:
	@git push -f origin $(shell git symbolic-ref --short HEAD):release/master
