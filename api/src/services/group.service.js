const groupModel = require("../models/group.model")

// Create Group Service
exports.createGroupService = (req, res) => {
    const body = req.body;

    groupModel.createGroupModel(body, (err, data) => {
        if(err) {
            res.json(err);
        }
        else res.json(data);
    })
}