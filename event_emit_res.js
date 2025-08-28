const EventEmitter = require('events');
const {readFile} = require('fs').promises;

const customEmitter = new EventEmitter();

const readFileFunc = async (path)=>{
    try {
        const first = await readFile(path, 'utf-8');
        console.log(first);
    } catch (error) {
        console.log(`path ${path} does not exist`);
    }
}

customEmitter.on('response', (data, path) =>{
    console.log(`data received`);
    console.log(data);
    readFileFunc(path);
})

customEmitter.emit('response', {id : 1, name : 'Farlan'}, "./Node/content/first.txt");