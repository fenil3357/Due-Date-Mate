const groupModel = require("./schema/group")
const studentModel = require("./schema/student")
const crypto = require("crypto");

// Create Group Model
exports.createGroupModel = async (data, callBack) => {
    data.id = crypto.randomUUID();
    let group = new groupModel(data);

    group.save()
        .then(doc => callBack(null, doc))
        .catch(err => callBack(err))
}

// Get all groups model
exports.getAllGroups = async (email, callBack) => {
    groupModel.find({ facultyEmail: email })
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
        .catch(err => callBack(err))
}

// Add Students To Group
exports.addStudentsToGroupModel = async (data, callBack) => {
    const groupId = data.groupId;
    const studentData = data.students;

    for (let i = 0; i < studentData.length; i++) {
        if (!studentData[i].name || !studentData[i].enNumber || !studentData[i].email) {
            callBack("Please provide all student parameters!");
            return;
        }
        studentData[i].id = crypto.randomUUID();
        studentData[i].groupId = groupId;

        let student = new studentModel(studentData[i]);

        await student.save()
            .then(doc => { })
            .catch(err => callBack(err))
    }
    callBack(null, null);
}