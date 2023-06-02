const groupModel = require("../models/group.model")

// Create Group Service
exports.createGroupService = (req, res) => {
    const body = req.body;

    if (!body.name) {
        res.status(400).json({
            Error: "Please provide all parameters",
            status: false
        })
        return;
    }

    groupModel.createGroupModel(body, (err, data) => {
        if (err) {
            res.status(500).json({
                Error: err.message,
                status: false
            });
            return;
        }
        else {
            res.status(200).json({
                Msg: "Group Created Successfully!",
                group: data,
                status: true
            })
        }
    })
}

// Get all groups
exports.getAllGroupsService = (req, res) => {
    const email = req.body.facultyEmail;

    if (!email || email === undefined) {
        res.status(400).json({
            Error: "Please provide all parameters",
            status: false
        })
        return;
    }

    groupModel.getAllGroups(email, (err, data) => {
        if (err) {
            res.status(500).json({
                Error: err.message,
                status: false
            });
            return;
        }
        else {
            res.status(200).json({
                groups: data,
                status: true
            })
        }
    })
}

// Add Student to Group Service
exports.addStudentsToGroupService = (req, res) => {
    const body = req.body;

    if (!body.students || !body.groupId) {
        res.status(400).json({
            Error: "Please provide all parameters",
            status: false
        })
        return;
    }

    groupModel.addStudentsToGroupModel(body, (err, result) => {
        if (err) {
            res.status(500).json({
                Error: err.message || err,
                status: false
            });
            return;
        }
        else {
            res.status(200).json({
                Msg: "Students added to groups successfully!",
                status: true
            })
        }
    })
}