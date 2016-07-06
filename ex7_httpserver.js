
const http = require('http'),
      through = require('through2');
var port = process.argv[2]

var server = http.createServer(function (req, res) {

	res.writeHead(200, { 'content-type' : 'text/plain' })

	if (req.method === 'POST') {
		req.pipe(through(function (buf, _, next) {
			
			this.push(buf.toString().toUpperCase())
			next()
		})).pipe(res)
	}
})
server.listen(port)