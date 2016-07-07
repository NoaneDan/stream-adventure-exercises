
const duplexer2 = require('duplexer2')
var spawn = require('child_process').spawn

module.exports = function (cmd, args) {

	// spawn a new process
	proc = spawn(cmd, args)
	
	// create and return a duplex stream
	return duplexer2(proc.stdin, proc.stdout)
}