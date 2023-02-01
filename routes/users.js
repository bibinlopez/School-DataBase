var express = require('express');
var router = express.Router();
var classController = require('../controller/class')
var studentController = require('../controller/student')


router.post('/addClass',classController.addClass)
router.get('/listClass',classController.listClass)
router.get('/getClass/:id',classController.getClass)
router.delete('/deleteClass/:id',classController.deleteClass)
router.put('/updateClass/:id',classController.updateClass)

router.post('/addStudent',studentController.addStudent)
router.get('/listAllStudent',studentController.listStudent)
router.get('/listStudentByClass',studentController.listStudentByClass)
router.get('/listStudentByStandard',studentController.listStudentByStandard)
router.get('/getStudent/:id',studentController.getStudent)
router.delete('/deleteStudent/:id',studentController.deleteStudent)
router.put('/updateStudent/:id',studentController.updateStudent)

module.exports = router;
