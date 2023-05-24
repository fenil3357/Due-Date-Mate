const reminderService = require("../services/reminder.service")

module.exports = (router) => {
    // Create Event Reminder
    router.post("/reminder/create-event", reminderService.createEventService);

    // Create Form Reminder
    router.post("/reminder/create-form", reminderService.createFormService);
}