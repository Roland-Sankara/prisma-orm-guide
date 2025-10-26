const express = require('express')
const { PrismaClient } = require('./generated/prisma')
const prisma = new PrismaClient()

const app = express()

// Middleware
app.use(express.json())

app.get('/', (req, res)=>{
    res.send("Welcome to this API service")
})

app.get('/schools', async (req, res)=>{
    let data = await prisma.school.findMany()
    res.send(data)
})

app.post('/schools', async (req, res)=>{
    let newSchool = await prisma.school.create({
        data: req.body
    })

    res.send(newSchool)
})

const PORT = 5005;

app.listen(PORT, ()=>{
    console.log(`Server listening on http://localhost:${PORT}...`)
})