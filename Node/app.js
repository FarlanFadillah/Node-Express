const {readFile, writeFile} = require('fs')

readFile('./content/first.txt', 'utf-8', (err, result)=>{
    if(err){
        console.log("error")
        return;
    }

    const first = result;
    readFile('./content/result.txt', 'utf-8', (err, result)=>{
        writeFile('./content/result_async.txt', `${first}, ${result}`, (err, result) => {
            
            if(err){
                console.log("error")
            }
            console.log(result)
        })
    })
})

