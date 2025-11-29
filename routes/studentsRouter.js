const express = require('express')
const router = express.Router()
const studentController = require('../controllers/studentsController');

router.get('/', studentController.getAllStudents)
router.post('/login', studentController.loginStudent)
router.post('/signup', studentController.createStudent)

module.exports = router