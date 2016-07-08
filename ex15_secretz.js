
const crypto = require('crypto'),
      zlib = require('zlib'),
      tar = require('tar'),
      concat = require('concat-stream')

var cipher = process.argv[2]
var passphrase = process.argv[3]

var decrypter = crypto.createDecipher(cipher, passphrase)
var parser = tar.Parse()

parser.on('entry', function (e) {

	var hash = crypto.createHash('md5', { encoding : 'hex' })

	if (e.type === 'File') {
		e.pipe(hash).pipe(concat(function (data) {
			
			console.log(data + ' ' + e.path)
		}))
	}
})

process.stdin.pipe(decrypter).pipe(zlib.createGunzip()).pipe(parser)
