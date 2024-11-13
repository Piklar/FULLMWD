const Course = require("../models/Course-Model.js");

module.exports.addCourse = (req, res) => {
    let {name, description, price} = req.body;
    let newCourse = new Course({
        name: name,
        description: description,
        price: price
    })

    return newCourse.save().then(result => {
        return res.send({
            code: "COURSE-ADDED",
            message: "NA SAVE NA YUNG COURSE NA NILAGAY MO!!!!",
            result: result
        })
    })
    .catch(error => {
        res.send({
            code: "SERVER-ERROR",
            message: "MAY ERRROR NUNG NILALAGAY YUNG COURSE MO. PAKIULIT, THANK YOU!",
            result: error
        })
    })
}

// Get all courses
module.exports.getAllCourses = (req, res) => {
    return Course.find({}).then(result => {
        if(result == null || result.length === 0){
            return res.send({
                code: "COURSE-EMPTY",
                message: "WALA PANG NAKALAGAY NA COURSE BHIE!"
            })
        }else{
            return res.send({
                code: "ALL-COURSES-RESULT",
                message: "ETO NA LAHAT NUNG MGA COURSES NA NAKAREGISTER NA!!!",
                result: result
            })
        }
    })
}