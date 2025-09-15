const express = require('express');

const app = express();


app.get('/', (req, res, next)=>{
    next(new Error("something broke"));
});

app.get('/login', (req, res, next)=>{
    next(new Error("Login error"));
});

app.use((req, res)=>{
    res.json({msg : 'route does not exist', src : req.originalUrl})
})

app.use((err, req, res, next)=>{
    if(req.originalUrl == '/login')
    {
        res.status(401).json({success : false, msg : "user not authenticated"})
    }
    next(err);
});
app.use((err, req, res, next)=>{
    if(req.originalUrl == '/')
    {
        res.status(401).json({success : false, msg : "cannot access this route"})
    }
    next(err);
});
app.use((err, req, res, next)=>{
    res.status(401).json({success : false, msg : "something  broke"})
});



app.listen(4000);