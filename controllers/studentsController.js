const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
require('dotenv').config();

const userLogin = async (req, res)=>{

    // lookup all students and find one with the given name
    let student = await prisma.student.findUnique({
        where:{
            name: req.body.name 
        }
    })

    if (student){
        // password matching
        if(student.password === req.body.password){
            // login the user

            // create the JWT
            let token = jwt.sign(
                {
                    name: student.name,
                    contact: student.contact
                }
                ,
                process.env.JWT_SECRET
                ,
                {
                    expiresIn: "1h"
                }
            )

            res.send({message:"Sucessfully LoggedIn", token: token})
        }else{
            res.send("Password Invalid.. Try Again")
        }
    }else{
        res.send("Student Not Found - 404!")
    }
}


module.exports = {
    userLogin
}