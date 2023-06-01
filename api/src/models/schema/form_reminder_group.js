const mongoose = require('mongoose')

const formReminderGroupSchema = new mongoose.Schema({
    reminderId: {
        type: String,
        required: [true, 'Reminder id must be provided']
    },
    groupId: {
        type: String,
        required: [true, 'Group id must be provided']
    },
    facultyEmail: {
        type: String,
        required: [true, 'Facuty email must be provided']
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('form-reminder-group', formReminderGroupSchema)