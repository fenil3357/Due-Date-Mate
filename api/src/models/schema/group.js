const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    id:{
        type:String,
        required:[true, 'Group id must be provided']
    },
    name:{
        type:String,
        required:[true, 'Group name must be provided']
    },
    faculty:{
        type:String,
        required:[true, 'Faculty email must be provided']
    },
    participants:{
        type:Number,
        default:0
    },
    last:{
        type:Date,
        default: new Date()
    }
})

module.exports = mongoose.model('group', groupSchema)