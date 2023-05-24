const reminderModel = require("../models/reminder.model")

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
                event: data,
                status: true
            })
        }
    })
}