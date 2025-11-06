const express = require('express')
const schoolsRouter = require('./routes/schoolsRouter');
const studentRouter = require('./routes/studentRouter');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app = express()

// Middleware
app.use(express.json())
// JWT Check
    // - checks the request for the authorization header
    // - the format "Barear <token>"
    // - verify the token

app.use((req, res, next)=>{

    console.log(req)

    if(req.url === '/api/v1/students/login'){
        return;
    }

    let headers = req.headers

    if(headers.authorization){
        let authHeader = headers.authorization;

        if(authHeader.startsWith('Bearer')){
            let token = authHeader.split(" ")[1]

            // verify
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
                if(err){
                    res.send('Token seems invalid');
                }else{
                    console.log(decoded)
                    next()
                }
            })
        }
        else{
            res.send('Auth header is malformed')
        }

    }else{
        res.send("Missing Auth Header")
    }
})


app.get('/api/v1/', (req, res)=>{
    res.send("Welcome to this API service")
})

app.use('/api/v1/schools', schoolsRouter);
app.use('/api/v1/students', studentRouter);

const PORT = 5005;

app.listen(PORT, ()=>{
    console.log(`Server listening on http://localhost:${PORT}...`)
})