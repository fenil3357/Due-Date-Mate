const crypto = require("crypto");
const eventModel = require("./schema/event")
const formModel = require("./schema/form")

// Create New Event Reminder
exports.createEventModel = async (data, callBack) => {
    data.id = crypto.randomUUID();
    let event = new eventModel(data);
    data.deadline = new Date(data.deadline);

    event.save()
        .then(doc => callBack(null, doc))
        .catch(err => callBack(err))
}

// Create New Form Reminder
exports.createFormModel = async (data, callBack) => {
    data.id = crypto.randomUUID();
    let form = new formModel(data);
    data.deadline = new Date(data.deadline);

    form.save()
        .then(doc => callBack(null, doc))
        .catch(err => callBack(err))
}