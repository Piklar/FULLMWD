const User = require("../models/User-Model.js");
const Enroll = require("../models/Enrollment-Model.js");
const bcryptjs = require("bcryptjs");
const auth = require("../auth.js")

module.exports.registerUser = (req,res) => {
    let newUser = new User({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastname: req.body.lastName,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        password: bcryptjs.hashSync(req.body.password, 10)
    })

    return newUser.save()
    .then(result => {
        res.send({
            code: "REGISTRATION-SUCCESS!!!",
            message: "You are now registered!",
            result: result
        })
    })
    .catch(error => {
        res.send({
            code: "REGISTRATION-FAILED",
            message: "We've encounted an error during the registration. Please try again!",
            result: error
        })
    })
}

// User Login
module.exports.loginUser = (req, res) => {
    let {email, password} = req.body;
    return User.findOne({email: email}).then(result => {
        if(result == null){
            return res.send({
                code: "USER-NOT-REGISTERED",
                message: "Pakicheck baka hindi pa registered yung hinahanap mo!"
            })
        }else{
            const isPasswordCorrect = bcryptjs.compareSync(password, result.password);

            if(isPasswordCorrect){
                return res.send({
                    code: "USER-LOGIN-SUCCESS",
                    token: auth.createAccessToken(result)
                })
            }else{
                return res.send({
                    code: "PASSWORD-INCORRECT",
                    message: "MAY MALI SA NAGAWA MO, PAKIULIT. SALAMAT!"
                })
            }
        }
    })
}

// Check email if existing
module.exports.checkEmail = (req, res) => {
    let {email} = req.body;
    return User.find({email: email}).then(result => {
        if(result.length > 0){
            return res.send({
                code: "EMAIL-EXISTS",
                message: "MAY EMAIL NA NAKAREGISTER NA DIYAN! BUGOK!!!"
            })
        }else{
            return res.send({
                code: "EMAIL-NOT-EXISTING",
                message: "HINDI PA NAKAREGISTER YANG EMAIL NA YAN!"
            })
        }
    })
}

// Get Profile Details using ID
module.exports.getProfile = (req, res) => {
    let {_id} = req.body;
    return User.find({_id: _id}).then(result => {
        if(result.length > 0){
            let x = "";
            for (let i = 0; i < result[0].password.length; i++){
                x += "*"
            }
            result[0].password = x;
            return res.send({
                code: "ID EXIST, HERE IS THE DATA!!!",
                result: result
            })
        }else{
            return res.send({
                code: "ID-NOT-EXISTING",
                message: "HINDI PA NAKAREGISTER YANG ID NA YAN!, REGISTER MO MUNA!!!!!!!!!!!!!!!!!!"
            })
        }
    })
}

// Enroll a user
module.exports.enroll = (req, res) => {
    const { id } = req.user;

    let newEnrollment = new Enroll({
        userId: id,
        enrolledCourse: req.body.enrolledCourse,
        totalPrice: req.body.totalPrice
    });

    newEnrollment.save().then((result, err) => {
        if(err){
            res.send({
                code: "ENROLLMENT-FAILED",
                message: "There is a problem during your enrollment, please try again!"
            })
        }else{
            res.send({
                code: "ENROLLMENT-SUCCESSFUL",
                message: "Congratulations, you are now enrolled!",
                result: result
            })
        }
    })
}