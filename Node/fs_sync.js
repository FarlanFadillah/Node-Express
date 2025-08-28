const {readFileSync, writeFileSync} = require('fs')

const path = './content'

const first = readFileSync(path + "/first.txt", 'utf-8');
console.log(first)




writeFileSync(path + "/result.txt", "\nGreat", {flag : 'a'})