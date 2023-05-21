const groupModel = require("./schema/group")
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