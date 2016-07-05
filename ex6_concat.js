
const http = require('http'),
      concat = require('concat-stream');

// concat collects all the buffers from a stream 
// and concatenates them together
process.stdin.pipe(concat(function (data) {
	console.log(data.toString().split('').reverse().join(''))	
}))