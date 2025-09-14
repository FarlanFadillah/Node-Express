const crypto = require('crypto');
const process = require('process');

console.log(process.env.PORT);
console.log(crypto.randomBytes(60).toString('hex'));