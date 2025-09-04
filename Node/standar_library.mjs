import express from 'express'
let port = 3000

const app = express()

app.get('/', (req, res) => {
    res.status(200).json({success: true, msg : "Hello World"})
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})