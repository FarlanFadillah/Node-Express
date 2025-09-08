//import express from 'express';
const express = require('express');

const app = express();
const port = 5000;

app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).json({success : true, msg : "Server Online"})
});

app.get('/about', (req, res)=>{
    res.status(200).send("This is About Page")
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`⚡️[server]: Server is running at http://localhost:${port}`))
}

module.exports = app;