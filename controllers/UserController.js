const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');
const SECRET_KEY = 'RESULTMANAGEMENT';
var router = express.Router();


const LocalStrategy=require('passport-local').Strategy;
const { default: mongoose } = require('mongoose');


mongoose.set('strictQuery',true);
router.get('/Open',function(req,res){
    res.send('respond with a resource');
    console.log("i am here");
});




function isValidUser(req,res,next){
    if(req.isAuthenticated())
    next();
    return res.status(401).json({message:'UnAuthorized Request'});
}


const auth= ()=>{
    return (req,res,next)=>{
        passport.authenticate('local',(err,user,info)=>{
            if(err)
            {   
                return res.status(501).json({error:info.message});
            }
            if(!user)
            {   
                return res.status(404).json({error:info.message});
            }
            if(!user)
            {
                return res.status(401).json({error:'Incorrect Password'});
            }
            
            req.login(user,function(error){
                if(error)
                return next(error);
                next();
            });
        })(req,res,next);
    }
}


passport.serializeUser(function(user,done)
{
    if(user) done(null,user);
});
passport.deserializeUser(function(id,done){
    done(null,id);
});


const isLoggedIn =(req,res,next)=>{
    if(req.isAuthenticated())
    {
        return next();
    }
    console.log("Not Authenticated");
    return res.status(400).json({"statusCode":400,"message":"not Authenticated"});
}

const GetUserDetail=async(req,res)=>{
    try{
        const UserName=req.params.username;
        console.log(UserName);
        const student=await User.findOne({username:UserName});
        
        
        if(!student)
        {   console.log("Data Not Found");
            return res.status(500).json({error:'No Data Found'});

        }
        
        return res.status(200).json(student)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}



const Logout=function(req,res)
{
    req.session.token=undefined;
    res.status(200);
    console.log("I am in logout");
    res.redirect('/');
};

const AddUser=function(req,res,next){
    addToDB(req,res);
   
};

const GetUser=async function(req,res)
{   
    const user=await User.find({})
    console.log(user);
    res.status(200).json(user);
   
};
async function addToDB(req,res)
{   
   
    var user=new User({
        name:req.body.name,
        username:req.body.username,
        password:User.hashPassword(req.body.password),
        //password:req.body.password,
        confirmpassword:req.body.confirmpassword

    })
    try{
       
        
        doc=await user.save();
        return res.sendStatus(200);
    }
    catch(err)
    {   
        console.log(err.message);
        return res.status(501).json(err);
    }
};

module.exports={Logout,AddUser,GetUser,isLoggedIn,auth,GetUserDetail};