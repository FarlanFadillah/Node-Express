const { Console } = require('console');
const {readFile, writeFile} = require('fs');

// function readJson(path){
//     return new Promise((resolve, reject)=>{
//         readFile(path, 'utf-8', (err, data)=>{
//             if(err) reject(err);
//             resolve(data);
//         })
//     })
// }

// async function main() {
//     try {
//         const data = await readJson('./article_01.json');
//         const jsonData = JSON.parse(data);
//         console.log(jsonData.content)
//     } catch (error) {
//         console.log(error.message)
//     }
// }

// const data = [1,2,3,4,5]

// for(var i = 1; i <= data.length; i+=2)
// {
//     for(var j = i; j < i+2; j++){
//         console.log(data[j-1]);
//     }
// }

// console.log(new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }))

function writeArticleToJson(id, title, content) {
    return new Promise((resolve, reject) => {
        const article = {
            title: title,
            content : content,
            status : "published"
        }
        const jsonString = JSON.stringify(article, null, 2);
        const path = './articles/article_' + id + '.json';
        writeFile(path, jsonString, (err) => {
            if(err) reject(err);
            resolve(path);
        })
    })
}

async function main() { 
    try {
        const path = await writeArticleToJson(0,"Hello", "Lorem Ipsum");
        console.log(path);
    } catch (error) {
        console.log(error)
    }
    return;
}
// function getRndInteger(min, max) {
//   return Math.floor(Math.random() * (max - min)) + min;
// } 

// console.log(getRndInteger(10000, 99999));

// main();