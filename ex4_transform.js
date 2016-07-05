
const through = require('through2')

function write(buffer, encoding, next) {

	this.push(buffer.toString().toUpperCase())
	next()
}

function end() {
	// end is not necessary in this exercise
}

// write: called for every buffer of available input data.
// end: called when there is no more data.
var stream = through(write, end)
process.stdin.pipe(stream).pipe(process.stdout)