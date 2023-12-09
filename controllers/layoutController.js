const express=require('express');
const { GetAllStudent } = require('./StudentController');
const { default: axios } = require('axios');
const auth=require("../middlewares/auth");
const router=express.Router();

const GetHomePage=function(req,res)
{
    res.render('HomePage');
}

const GetLoginPage=function(req,res){
    res.render('Login');
}

const GetStudentPage=function(req,res){
    res.render('Student');
}

const GetDashboardPage=async function(req,res)
{   
  
    const response=await axios.get('http://localhost:3000/studentRecord');
    
    const StudentData=response.data;
    console.log(StudentData);
    res.render('Dashboard',{StudentRecords:StudentData});
}

const GetRegisterPage=function(req,res){
    res.render('Register');
}

function fetchStudentData(rollNo)
{
    return fetch(`http://localhost:3000/Student/${rollNo}`).then(
        res=>res.json()).catch(error => {
        console.log("Error fetching student record:", error);
       
    });
}
const GetResultPage=async function(req,res)
{
    const rollNo=req.query.RollNo;
    fetchStudentData(rollNo).then(
        studentRecord=>{
            res.render('Result',{studentData:studentRecord});
        }).catch(error=>{console.log("problem is fetching data");
});
   
}
module.exports={GetHomePage,GetLoginPage,GetRegisterPage,GetStudentPage,GetDashboardPage,GetResultPage};