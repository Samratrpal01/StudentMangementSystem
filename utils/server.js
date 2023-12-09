const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://jacksparrowrp01:asdfghjkl@cluster0.uaocljz.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log('connected to DB')
}).catch(()=>{
    console.log("Failed in macking Connection")
})
