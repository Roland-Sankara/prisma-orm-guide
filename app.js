const express = require('express')
const schoolsRouter = require('./routes/schoolsRouter');
const studentRouter = require('./routes/studentsRouter');
const {rateLimit} = require('express-rate-limit');
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app = express()

// Middleware

app.use(morgan('common'));

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
})

// rate limit function
app.use(limiter)

app.use(express.json())

app.use((req, res, next)=>{
    
    if(req.url === '/api/v1/students/login' || req.url === '/api/v1/students/signup'){
        return next()
    }

    if(req.headers.authorization){
        if(req.headers.authorization.startsWith('Bearer')){
                let token = req.headers.authorization.split(" ")[1]

                // verify
                jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
                    if(err){
                        res.send("token is invalid")
                    }else{
                        req.jwtData = decoded
                        return next()
                    }
                })

        }else{
            res.send("Missing Bearer. wrong format")
        }


    }else{
        res.send("Missing Authorization Header")
    }

})


app.get('/api/v1/', (req, res)=>{
    res.send("Welcome to this API service")
})

app.use('/api/v1/schools', schoolsRouter);
app.use('/api/v1/students', studentRouter);

module.exports = app;