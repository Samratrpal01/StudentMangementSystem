const express=require('express');
const router=express.Router();
const Student=require('../Models/StudentModel')
const mongoose=require('mongoose')
const auth=require('../middlewares/auth');

const {Create,GetAllStudent,GetStudentByRollNo,UpdateStudentByRollNo,DeleteStudentByRollNo}=require("../controllers/StudentController");


router.post('/student',Create)

router.get('/studentRecord',GetAllStudent)


router.get('/student/:rollNO',GetStudentByRollNo)

router.put('/student/:rollNo',UpdateStudentByRollNo)

router.delete('/student/:rollNo',DeleteStudentByRollNo)

module.exports=router