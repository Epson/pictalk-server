build:
	lsc -bc -o bin src

clean:
	rm -Rf bin/*

.PHONY: build clean
