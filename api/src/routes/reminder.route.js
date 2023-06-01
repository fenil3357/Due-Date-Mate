const reminderService = require("../services/reminder.service")

module.exports = (router) => {
    // Create Event Reminder
    router.post("/reminder/create-event", reminderService.createEventService);

    // Create Form Reminder
    router.post("/reminder/create-form", reminderService.createFormService);

    // Send Event Reminder To Groups
    router.post("/reminder/send-event", reminderService.sendEventReminderToGroupsService);

    // Send Form Reminder To Groups
    router.post("/reminder/send-form", reminderService.sendFormReminderToGroupsService);

    // Get All Event Reminders
    router.post("/reminder/get-events", reminderService.getAllEventRemindersService);

    // Get All Form Reminders
    router.post("/reminder/get-forms", reminderService.getAllFormRemindersService);
}