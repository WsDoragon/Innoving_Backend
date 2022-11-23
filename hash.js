var hash = require('hash.js')
hash.sha256().update('abc').digest('hex')

var sha512 = require('hash.js/lib/hash/sha/512');
console.log(sha512().update('b').digest('hex'));