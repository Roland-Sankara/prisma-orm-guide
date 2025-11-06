const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient()

const getAllSchools = async (req, res)=>{
    let data = await prisma.school.findMany()
    res.send(data)
}

const createNewSchool = async (req, res)=>{
    let newSchool = await prisma.school.create({
        data: req.body
    })
    res.send(newSchool)
}

module.exports = {
    getAllSchools,
    createNewSchool
}