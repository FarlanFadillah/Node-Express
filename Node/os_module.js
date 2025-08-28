const os = require('os')

console.log(os.version())

//method returns the system uptime in seconds
console.log(`the system uptime is ${os.uptime()}s`)


const currentOs = {
    name : os.type(),
    release : os.release(),
    totalMem : os.totalmem(),
    freeMem : os.freemem()
}


console.log(currentOs)
