
const split = require('split'),
      through = require('through2');

var lineNumber = 0
process.stdin
	.pipe(split())
	.pipe(through(function (data, encoding, next) {

		++lineNumber
		
		this.push(lineNumber % 2 == 0 ?
			data.toString().toUpperCase() + '\n' :
			data.toString().toLowerCase() + '\n')
		next()
	}))
	.pipe(process.stdout)    