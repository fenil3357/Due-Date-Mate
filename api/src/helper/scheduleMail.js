const schedule = require("node-schedule")
const sendEmail = require("./mailHelper")
const { eventReminderEmailOptions, formReminderEmailOptions } = require("./mailOptions")

// Event Reminder Scheduler
exports.eventReminderScheduler = function (data) {
    const job = schedule.scheduleJob({ start: new Date(), end: data.event[0].deadline, rule: "0 09,21 * * *" }, function () {
        for (let i = 0; i < data.students.length; i++) {
            const emailOptions = eventReminderEmailOptions(data.event[0], data.students[i]);
            sendEmail(emailOptions, (err) => {
                if(err) {
                    console.log("Error")
                }
            })
        }
    })
}

// Form Reminder Scheduler
exports.formReminderScheduler = function (data) {
    const job = schedule.scheduleJob({ start: new Date(), end: data.form[0].deadline, rule: "0 09,21 * * *" }, function () {
        for (let i = 0; i < data.students.length; i++) {
            const emailOptions = formReminderEmailOptions(data.form[0], data.students[i]);
            sendEmail(emailOptions, (err) => {
                if(err) {
                    console.log("Error")
                }
            })
        }
    })
}