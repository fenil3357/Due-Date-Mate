const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    id:{
        type:String,
        required:[true, 'Student id must be provided']
    },
    enNumber:{
        type:Number,
        required:[true, 'Student Enrollment Number must be provided']
    },
    name:{
        type:String,
        required:[true, 'Student name must be provided']
    },
    email:{
        type:String, 
        required:[true, 'Student email must be provided']
    },
    groupId: {
        type:String,
        required:[true, 'Group id must be provided']
    }
})

module.exports = mongoose.model('student', studentSchema)