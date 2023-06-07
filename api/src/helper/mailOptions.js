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
               <p>Faculty/Author (Assigned by) : <b>${event.facultyEmail}</b>.</p></br>
               <p>Date : <b>${event.deadline}</b>.</p></br></br>
               <p>This email is auto-generated. Please do not reply to this email.</p></br>
               <p>Thank you.</p></br>
               <h3>Due Date Mate</h3>`
    }
}

// Form Reminder Email
exports.formReminderEmailOptions = (form, student) => {
    return {
        to: student.email,
        from: process.env.GMAIL_USER,
        subject: `Reminder for ${form.name}`,
        html: `<p>Hello, <b>${student.name}</b></p></br>
               <p>This mail is to remind you about <b>${form.name}</b></p></br>
               <p>Form Description : ${form.description}</p></br>
               <p>Faculty/Author (Assigned by) : <b>${form.facultyEmail}</b>.</p></br>
               <p>Link of the form : <b><a href='${form.formLink}'>${form.formLink}</a></b>.</p></br>
               <p>Deadline of the form : <b>${form.deadline}</b>.</p></br>
               <p><b>You must fill out the form before the given deadline. Ignore this mail if you have already filled up the form.</b>.</p></br>
               <p>This email is auto-generated. Please do not reply to this email.</p></br>
               <p>Thank you.</p></br>
               <h3>Due Date Mate</h3>`
    }
} 

// Form Reminder Email
