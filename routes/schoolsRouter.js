const express = require('express');
const router = express.Router()
const schoolsController = require('../controllers/schoolsController')

router.get('/', schoolsController.getAllSchools)
// router.get('/', (req,res)=>{
//     res.send(req.query)
// })
router.post('/', schoolsController.createNewSchool)

module.exports = router;