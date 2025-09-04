import express from 'express'
import cors from 'cors'
let port = 8080

const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({success: true, msg : "Hello World"})
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})