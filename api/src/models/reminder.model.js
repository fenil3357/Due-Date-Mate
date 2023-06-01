const crypto = require("crypto");
const eventModel = require("./schema/event")
const formModel = require("./schema/form")
const eventGroupModel = require("./schema/event_reminder_group")
const formGroupModel = require("./schema/form_reminder_group")

// Create New Event Reminder Model
exports.createEventModel = async (data, callBack) => {
    data.id = crypto.randomUUID();
    let event = new eventModel(data);
    data.deadline = new Date(data.deadline);

    event.save()
        .then(doc => callBack(null, doc))
        .catch(err => callBack(err))
}

// Create New Form Reminder Model
exports.createFormModel = async (data, callBack) => {
    data.id = crypto.randomUUID();
    let form = new formModel(data);
    data.deadline = new Date(data.deadline);

    form.save()
        .then(doc => callBack(null, doc))
        .catch(err => callBack(err))
}

// Send Event Reminder To Groups Model
exports.sendEventReminderToGroupsModel = async (data, callBack) => {
    for (let i = 0; i < data.groups.length; i++) {
        let curData = {
            reminderId: data.reminderId,
            groupId: data.groups[i],
            facultyEmail: data.facultyEmail
        }
        let eventGroup = new eventGroupModel(curData);

        await eventGroup.save()
            .then(doc => { })
            .catch(err => callBack(err));
    }
    callBack(null, null);
}

// Send Form Reminder To Groups Model
exports.sendFormReminderToGroupsModel = async (data, callBack) => {
    for (let i = 0; i < data.groups.length; i++) {
        let curData = {
            reminderId: data.reminderId,
            groupId: data.groups[i],
            facultyEmail: data.facultyEmail
        }
        let formGroup = new formGroupModel(curData);

        await formGroup.save()
            .then(doc => { })
            .catch(err => callBack(err));
    }
    callBack(null, null);
}

// Get All Event Reminders Model
exports.getAllEventRemindersModel = async (data, callBack) => {
    eventGroupModel.find({ groupId: data.groupId })
        .then(doc => {
            // Sort data according to date
            doc.sort(function (a, b) {
                var keyA = new Date(a.last), keyB = new Date(b.last);
                // Compare the 2 dates
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            });
            callBack(null, doc);
        })
        .catch(err => callBack(err));
}

// Get All Form Reminders Model
exports.getAllFormRemindersModel = async (data, callBack) => {
    formGroupModel.find({ groupId: data.groupId })
        .then(doc => {
            // Sort data according to date
            doc.sort(function (a, b) {
                var keyA = new Date(a.last), keyB = new Date(b.last);
                // Compare the 2 dates
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            });
            callBack(null, doc);
        })
        .catch(err => callBack(err));
}