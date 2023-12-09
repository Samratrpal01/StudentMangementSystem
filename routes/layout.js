const express=require('express');
const router=express.Router();
const Student=require('../Models/StudentModel')
const mongoose=require('mongoose')
const auth=require('../middlewares/auth');

const {GetHomePage,GetLoginPage,GetRegisterPage,GetStudentPage,GetDashboardPage,GetResultPage}=require("../controllers/layoutController");
router.get('/',GetHomePage)

router.get('/login',GetLoginPage)

router.get('/Student',GetStudentPage);
router.get('/Register',GetRegisterPage);

router.get('/HomePage',GetHomePage);

router.get('/Dashboard',auth,GetDashboardPage);

router.get('/Result',GetResultPage);

module.exports=router;