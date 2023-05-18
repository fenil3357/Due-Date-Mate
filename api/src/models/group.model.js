const groupModel = require("./schema/group")
const crypto = require("crypto");

// Create Group Model
exports.createGroupModel = async (data, callBack) => {
    let group = new groupModel(data);

    group.save()
    .then(doc => callBack(null, doc)
    .catch(err => callBack(err)))
}