const express=require('express');
const router=express.Router();
const Student=require('../Models/StudentModel')
const mongoose=require('mongoose')
const {Logout,AddUser,GetUser,isLoggedIn,auth,GetUserDetail}=require("../controllers/UserController");


router.get('/getData', isLoggedIn, (req, res) => {
    res.json("data")
})


router.post('/authenticate',auth,(req,res)=>
{
    res.status(200).json({"statusCode":200,"message":"Hello API"});
});
router.get('/user',GetUser);

router.get('/logout',Logout);

router.post('/user',AddUser);

router.get('/user/:username',GetUserDetail)
module.exports=router;
