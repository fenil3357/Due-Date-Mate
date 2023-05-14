const authModel = require("../models/auth.model")
const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");


// Faculty Sign up service 
exports.signUpService = (req, res) => {
    const data = req.body;

    if (!data.email || !data.password || !data.name) {
        res.status(400).json({
            Error: "Please provide all parameters",
            status: false
        })
        return;
    }

    // Check if faculty already exists
    authModel.getFacultyModel(data.email, (err, doc) => {
        if (err) {
            res.status(500).json({
                Error: err.message,
                status: false
            });
            return;
        }
        if (doc !== null) {
            res.status(500).json({
                Error: "Email Already in use",
                status: false
            })
            return;
        }
        // Save faculty details
        authModel.signUpModel(data, (err, doc) => {
            if (err) {
                res.status(500).json({
                    Error: err.message,
                    status: false
                });
                return;
            }
            res.status(200).json({
                Msg: "Sign up complete!",
                Faculty: doc,
                status: true
            })
        })
    })
}

// Faculty log in service
exports.loginService = (req, res) => {
    const data = req.body;

    if (!data.email || !data.password) {
        res.status(400).json({
            Error: "Please provide all parameters",
            status: false
        })
        return;
    }

    // Check if faculty already exists
    authModel.getFacultyModel(data.email, (err, doc) => {
        if (err) {
            res.status(500).json({
                Error: err.message,
                status: false
            });
            return;
        }
        if (doc === null) {
            res.status(401).json({
                Error: "Acccount does not exists",
                status: false
            })
            return;
        }
        // Check password
        const result = compareSync(data.password, doc.password);

        // Valid password
        if (result) {
            // create json web token
            const token = sign({ faculty: doc }, process.env.JWT_SECRET, {
                expiresIn: "30day",
            });

            res.status(200).json({
                Msg: "Log In Successfull!",
                Faculty: doc,
                token: token,
                status: true
            })
        }
        // Invalid Password
        else {
            res.status(401).json({
                Error: "Invalid Password",
                status: false
            })
        }
    })
}