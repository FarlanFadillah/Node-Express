const {readFile, writeFile} = require('fs').promises;

const start = async ()=>{
    try {
        
        const first = await readFile('./Node/content/first.txt', 'utf-8')
        await writeFile('./Node/content/result.txt', `\nThis is the result: ${first}`, {flag: 'a'})
        console.log(first);
    } catch (error) {
        console.log(error);
    }
}

start();
console.log("Starting the next task");