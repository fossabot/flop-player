emcc -O3 parser_avf.c --js-library js-library.js -s EXPORTED_RUNTIME_METHODS=ccall -o parser.js