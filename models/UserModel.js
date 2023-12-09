var mongoose =require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt');

var schema=new mongoose.Schema({
    name:{type:String,required:false},
    username:{type:String,required:true},
    password:{type:String,required:true},
    confirmpassword:{type:String,required:false}


});

schema.statics.hashPassword=function hashPassword(password)
{
    return bcrypt.hashSync(password,10);
}

schema.methods.isValid=function(hashedpassword)
{
    console.log(hashedpassword);
    return bcrypt.compareSync(hashedpassword,this.password);

}

module.exports =mongoose.model('User',schema);