const mongoose=require('mongoose')
const studentSchema=mongoose.Schema({
    Name:{
        type:String,
         required:true
    },
    PhoneNo:{
        type:String,
        required:true
    },
    RollNo:{
        type:Number,
        required:true,
        primaryKey:true,
        default:0
    },
    Score:{
        type:Number,
        default:0
    },
    DateOfBirth:{
        type:Date
    }

})

const Student=mongoose.model('Student',studentSchema);

module.exports=Student;