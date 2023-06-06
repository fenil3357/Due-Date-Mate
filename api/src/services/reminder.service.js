const reminderModel = require("../models/reminder.model")
const { eventReminderEmailOptions } = require("../helper/mailOptions")
const sendEmail = require("../helper/mailHelper")

// Create New Event Remidner Service
exports.createEventService = (req, res) => {
    const body = req.body;

    if (!body.name || !body.description || !body.facultyEmail || !body.deadline) {
        res.status(400).json({
            Error: "Please provide all parameters",
            status: false
        })
        return;
    }

    reminderModel.createEventModel(body, (err, data) => {
        if (err) {
            res.status(500).json({
                Error: err.message,
                status: false
            });
            return;
        }
        else {
            res.status(200).json({
                Msg: "Event Reminder Created Successfully!",
                event: data,
                status: true
            })
        }
    })
}

// Create New Form Remidner Service
exports.createFormService = (req, res) => {
    const body = req.body;

    if (!body.name || !body.description || !body.facultyEmail || !body.deadline || !body.formLink || !body.responseLink) {
        res.status(400).json({
            Error: "Please provide all parameters",
            status: false
        })
        return;
    }

    reminderModel.createFormModel(body, (err, data) => {
        if (err) {
            res.status(500).json({
                Error: err.message,
                status: false
            });
            return;
        }
        else {
            res.status(200).json({
                Msg: "Form Reminder Created Successfully!",
                form: data,
                status: true
            })
        }
    })
}

// Send Event Reminder to Groups Service
exports.sendEventReminderToGroupsService = (req, res) => {
    const body = req.body;

    if (!body.reminderId || !body.groups || !body.facultyEmail) {
        res.status(400).json({
            Error: "Please provide all parameters",
            status: false
        })
        return;
    }

    reminderModel.sendEventReminderToGroupsModel(body, (err, result) => {
        if (err) {
            res.status(500).json({
                Error: err.message,
                status: false
            });
            return;
        }
        else {
            // Send Event Reminder Email
            for (let i = 0; i < result.students.length; i++) {
                const emailOptions = eventReminderEmailOptions(result.event[0], result.students[i]);
                sendEmail(emailOptions, (mail_error) => {
                    if (mail_error) {
                        res.status(500).json({
                            Error: mail_error,
                            status: false
                        })
                    }
                })
            }

            res.status(200).json({
                Msg: "Redminer sent to Groups",
                status: true
            })
        }
    })
}

// Send Form Reminder to Groups Service
exports.sendFormReminderToGroupsService = (req, res) => {
    const body = req.body;

    if (!body.reminderId || !body.groups || !body.facultyEmail) {
        res.status(400).json({
            Error: "Please provide all parameters",
            status: false
        })
        return;
    }

    reminderModel.sendFormReminderToGroupsModel(body, (err, result) => {
        if (err) {
            res.status(500).json({
                Error: err.message,
                status: false
            });
            return;
        }
        else {
            res.status(200).json({
                Msg: "Redminer sent to Groups",
                status: true
            })
        }
    })
}

// Get All Event Reminders Service
exports.getAllEventRemindersService = (req, res) => {
    const body = req.body;

    if (!body.groupId || !body.facultyEmail) {
        res.status(400).json({
            Error: "Please provide all parameters",
            status: false
        })
        return;
    }

    reminderModel.getAllEventRemindersModel(body, (err, data) => {
        if (err) {
            res.status(500).json({
                Error: err.message,
                status: false
            });
            return;
        }
        else {
            res.status(200).json({
                Events: data,
                status: true
            })
        }
    })
}

// Get All Form Reminders Service
exports.getAllFormRemindersService = (req, res) => {
    const body = req.body;

    if (!body.groupId || !body.facultyEmail) {
        res.status(400).json({
            Error: "Please provide all parameters",
            status: false
        })
        return;
    }

    reminderModel.getAllFormRemindersModel(body, (err, data) => {
        if (err) {
            res.status(500).json({
                Error: err.message,
                status: false
            });
            return;
        }
        else {
            res.status(200).json({
                Forms: data,
                status: true
            })
        }
    })
}