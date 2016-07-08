
const combine = require('stream-combiner'),
      split = require('split'),
      through = require('through2'),
      zlib = require('zlib');

module.exports = function () {

	var parser = through(write, end)
	var current

	function write(buf, _, next) {

		if (buf.length == 0) {
			return next()
		}

		var data = JSON.parse(buf)
	
		if (data.type === 'genre') {
			if (current) {
				this.push(JSON.stringify(current) + '\n')
			}	
			current = { name : data.name, books : [] }

			next()
		}
		else if (data.type === 'book') {
			current.books.push(data.name)

			next()
		}
	}

	function end(done) {
		
		if (current) {
			this.push(JSON.stringify(current) + '\n')
		}		

		done()
	}
	
	// combine the streams into a single duplex stream 
	// write to split()
	// read from zlib.createGzip()
	return combine(
		split(),
		parser,
		zlib.createGzip()
		
	)
}
