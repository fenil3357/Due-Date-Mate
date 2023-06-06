require("dotenv").config()

// Event Reminder Email
exports.eventReminderEmailOptions = (event, student) => {
    return {
        to: student.email,
        from: process.env.GMAIL_USER,
        subject: `Reminder for ${event.name}`,
        html: `<p>Hello, <b>${student.name}</b></p></br>
               <p>This mail is to remind you about <b>${event.name}</b></p></br>
               <p>Description for the same : ${event.description}</p></br>
               <p>Faculty/Author : <b>${event.facultyEmail}</b>.</p></br>
               <p>Date : <b>${event.deadline}</b>.</p></br></br>
               <p>This email is auto-generated. Please do not reply to this email.</p></br>
               <p>Thank you.</p></br>
               <h3>Due Date Mate</h3>`
    }
}

// Form Reminder Email
