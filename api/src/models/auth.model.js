const facultyModel = require("./schema/faculty")
const crypto = require("crypto");
const { hashSync, genSaltSync } = require("bcrypt");

// Get faculty from email model
exports.getFacultyModel = async (email, callBack) => {
    facultyModel.findOne({
        email: email
    })
        .then(doc => {
            callBack(null, doc);
        })
        .catch(err => {
            callBack(err);
        })
}

// Faculty Sign up model
exports.signUpModel = async (data, callBack) => {

    data.id = crypto.randomUUID();

    const salt = genSaltSync(10);
    data.password = hashSync(data.password, salt);

    let facultymodel = new facultyModel(data);

    facultymodel.save()
        .then(doc => {
            callBack(null, doc);
        })
        .catch(err => {
            callBack(err);
        })
}