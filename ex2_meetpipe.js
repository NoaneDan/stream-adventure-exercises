
const fs = require('fs')
var file = process.argv[2]

// create a read stream an pipe the content to stdout
fs.createReadStream(file).pipe(process.stdout)