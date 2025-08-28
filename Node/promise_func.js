const {readFile} = require('fs');



const getText = (path)=>{
    return new Promise((resolve, reject)=>{
        readFile(path, 'utf-8', (err, data)=>{
            if(err){
                reject(err)
            } else{
                resolve(data)
            }
        })
    })
}

// getText('./Node/content/first.txt')
// .then((result)=> console.log(result))
// .catch((err)=> console.log(err))   


const start = async ()=>{
    try{
        const first = await getText('./Node/content/first.txt')
        console.log(first);
    } catch(error){
        console.log(error);
    }
}

start();

// readFile('./Node/content/first.txt', 'utf-8', (err, data)=>{
//     if(err){
//         return;
//     } else{
//         console.log(data);
//     }
// })

