const mongoose = require('mongoose')

const facultySchema = new mongoose.Schema({
    id:{
        type:String,
        required:[true, 'Faculty id must be provided']
    },
    name:{
        type:String,
        required:[true, 'Faculty name must be provided']
    },
    email:{
        type:String, 
        required:[true, 'Faculty email must be provided']
    },
    password:{
        type:String,
        required:[true, 'Faculty password must be provided']
    }
})

module.exports = mongoose.model('faculty', facultySchema)