
const duplexer = require('duplexer2'),
      through = require('through2').obj;

module.exports = function (counter) {
    
	var counts = {}
    	var inStream = through(write, end)
    
	return duplexer({objectMode: true}, inStream, counter)
    
    	function write (data, _, next) {
        	
		counts[data.country] = counts[data.country] || 0 
		++counts[data.country]
        	
		next();
    	}
    
	function end (done) {
        	
		counter.setCounts(counts)
        
		done()
    	}
}