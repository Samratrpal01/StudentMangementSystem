const express=require('express');
const router=express.Router();
const Student=require('../Models/StudentModel')
const mongoose=require('mongoose')


const Create=async(req,res)=>{
   try{
    const student=await Student.create(req.body)
    console.log(req.body)
    res.status(200).json(student);
   }
   catch(error)
   {
    console.log(error.message);
    res.status(500).json({message:error.message})
   }
}

const GetAllStudent=async(req,res)=>{
    try{
        const students=await Student.find({})
        res.status(200).json(students);
    }
    catch(error)
    {
        res.status(500).json({message:error.message});
    }
}


const GetStudentByRollNo=async(req,res)=>{
    try{
        const rollNo=req.params.rollNO;
        const student=await Student.findOne({RollNo:rollNo});
        
        
        if(!student)
        {   console.log("Data Not Found");
            return res.status(500).json({error:'No Data Found'});

        }
        console.log(rollNo)
        return res.status(200).json(student)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const UpdateStudentByRollNo=async(req,res)=>{
    try{
        const rollNo =req.params.rollNo;
        const student=await Student.updateOne({RollNo:rollNo},req.body);
        if(!student)
        {
            return res.status(404).json({error:'Record Not Found With That Roll Number'})
        }
        const updatedStudent=await Student.find({RollNo:rollNo});
        
        res.status(200).json(updatedStudent) 

    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

const DeleteStudentByRollNo=async(req,res)=>{
    try{
        const rollNo=req.params.rollNo;
        const student=await Student.deleteOne({RollNo:rollNo});
        if(!student)
        {
            return res.status(404).json({message:"Cannot Find Studnt With That Roll Number"});
        }

        res.status(200).json(student);
    }
    catch(error)
    {
        res.status(500).json(error.message);
    }
}



module.exports={DeleteStudentByRollNo,Create,UpdateStudentByRollNo,GetStudentByRollNo,GetAllStudent};