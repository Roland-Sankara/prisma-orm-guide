const {PrismaClient} = require('../generated/prisma');
const prisma = new PrismaClient();
const {faker} = require('@faker-js/faker');

const NUM_OF_SCHOOLS = 5;

async function main(){
    // create the schools 5
    
    const newSchools = Array.from({length: NUM_OF_SCHOOLS}).map(()=>{
        return prisma.school.create({
            data:{
                name: faker.company.name(),
                contact: faker.phone.number(),
                students: {
                    createMany: {
                        data: Array.from({length: faker.number.int({min: 2, max: 3})}).map(()=>{
                            return {
                                name: faker.person.fullName(),
                                contact: faker.phone.number(),
                                password: faker.string.alphanumeric(5)
                            }
                        })
                    }
                }
                
            }
        })
    })
    
    await Promise.all(newSchools)
    // Print succesfully seeded database
    console.log("Successfully Seeded the Database")
}

// run the function
main()
    .then(()=>{
        prisma.$disconnect()
    })
    .catch((err)=>{
        console.log(err)
        prisma.$disconnect()
        process.exit(1)
    })