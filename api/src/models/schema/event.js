const mongoose = require('mongoose')

const eventReminderSchema = new mongoose.Schema({
    id:{
        type:String,
        required:[true, 'Reminder id must be provided']
    },
    name:{
        type:String,
        required:[true, 'Reminder name must be provided']
    },
    description:{
        type:String, 
        required:[true, 'Reminder Description must be provided']
    },
    facultyEmail:{
        type:String,
        required:[true, 'Faculty email must be provided']
    },
    deadline: {
        type: Date,
        required: [true, 'Reminder deadline must be provided']
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('event', eventReminderSchema)