const express=require('express')
const app=express();
const session=require('express-session')
const passport=require('passport');
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;

const exp = require('constants')

const mongoose=require('mongoose')


const UserRoute=require("./Routes/user");
const StudentRoute=require("./Routes/student");
const LayoutRoute=require("./Routes/layout");
const PassportRoute=require("./Passport/passport-config");
//app.use('/users/',userRouter)

app.use(express.static('Public/CSS'));
app.use(express.static('Public/Assets'));
app.use(express.static('Public/Shared'));
app.use(express.static('Public/JS'));
// View Engine Setup

app.set('views', path.join('views'))
app.set('view engine', 'ejs')




const router = require('./Routes/user')



app.use(express.json()) 
app.use(
    session({
        name:'userSession',
        secret:'secret',
        resave:false,
        saveUninitialized:false,
        cookie:{maxAge:60*60*1000}
    })
);
//Login Implementation Start.
app.use(passport.initialize());
app.use(passport.session());


app.use((req,res,next)=>{

    console.log("HTTP Method- "+req.method+", URL- "+req.url);
    const secretKey="";
    let token="";
   
        token=req.session.token;
        console.log("session tokne value"+token);
        req.headers.authorization = `Bearer ${token}`;
        next();


    console.log(token);

    
   
}); 

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended:true}));


app.use("/",router);
require('./utils/server');
app.use('/',UserRoute);
app.use('/',StudentRoute);
app.use('/',LayoutRoute);
app.use('/',PassportRoute);

var cors = require('cors');
app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));


app.use(bodyParser.json());
app.use(cors());
app.listen(process.env.PORT || 3000,()=>{
    console.log("Node API is running on Port 3000")
})


