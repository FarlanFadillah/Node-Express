const {readFile, writeFile, write} = require('fs');
const util = require('util');
const readFilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(writeFile);


const start = async ()=>{
    try{
        const first = await readFilePromise('./Node/content/first.txt', 'utf-8')

        await writeFilePromise('./Node/content/result.txt', `\nThis is the result: ${first}`, {flag: 'a'})
        console.log(first);
    } catch(error){
        console.log(error);
    }
}

start();

