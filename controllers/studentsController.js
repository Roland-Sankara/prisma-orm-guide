const { PrismaClient } = require("../generated/prisma");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const prisma = new PrismaClient();

const getAllStudents = async (req, res) => {
  let students = await prisma.student.findMany();
  res.send(students);
};

const loginStudent = async (req, res) => {
  // req.body (name, password)

  // look up the database for a user with the given name
  let student = await prisma.student.findUnique({
    where: {
      name: req.body.name,
    },
  });

  if (student) {
    bcrypt.compare(req.body.password, student.password, (err, result) => {
      if (result) {
        // payload
        let payload = {
          sub: student.id,
          name: student.name,
        };

        // create the token
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: "1h" },
          (err, token) => {
            if (err) {
              res.send("failed to create token");
            } else {
              // send to the user
              res.send({ message: "Succesfully Logged In", token: token });
            }
          }
        );
      } else {
        res.send("Password is incorrect");
      }
    });
  } else {
    res.send("Student Not Found");
  }
};

const createStudent = async (req, res) => {
  bcrypt.hash(req.body.password, 10, async (err, hashed) => {
    if (!err) {
      let newStudent = await prisma.student.create({
        data: {
          name: req.body.name,
          contact: req.body.contact,
          password: hashed,
        },
      });

      if (newStudent) {
        res.send("New Student Created");
      }
    }
  });
};

module.exports = {
  getAllStudents,
  loginStudent,
  createStudent,
};
