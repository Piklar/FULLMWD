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

//Get all active courses
module.exports.getAllActiveCourses = (req, res) => {
    return Course.find({isActive: true}).then(result => {
        if(result == null || result.length === 0){
            return res.send({
                code: "COURSE-EMPTY",
                message: "WALA PANG NAKALAGAY NA COURSE BHIE!"
            })
        }else{
            return res.send({
                code: "ALL-ACTIVE-COURSES-RESULT",
                message: "ETO NA LAHAT NUNG MGA COURSES NA ACTIVE!!!",
                result: result
            })
        }
    })
}

//Get all inactive courses
module.exports.getAllInactiveCourses = (req, res) => {
    return Course.find({isActive: false}).then(result => {
        if(result == null || result.length === 0){
            return res.send({
                code: "COURSE-EMPTY",
                message: "WALA PANG NAKALAGAY NA COURSE BHIE!"
            })
        }else{
            return res.send({
                code: "ALL-ACTIVE-COURSES-RESULT",
                message: "ETO NA LAHAT NUNG MGA COURSES NA INACTIVE!!!",
                result: result
            })
        }
    })
}

//Get specific course using ID
module.exports.getSpecificCourse = (req, res) => {
    const {courseId} = req.params;
    return Course.findById(courseId).then(result => {
        if(result == null || result.length === 0){
            return res.send({
                code: "COURSE-NOT-FOUND",
                message: "WALA PANG NAKALAGAY NA COURSE WITH THAT ID BHIE!"
            })
        }else{
            return res.send({
                code: "COURSE-FOUND",
                message: `The data from ${courseId.toUpperCase()}`,
                result: result
            })
        }
    })
}

// Archive course
module.exports.archiveCourse = (req, res) => {
    const {courseId} = req.params
    const updateField = {
        isActive : false
    }

    return Course.findByIdAndUpdate(courseId, updateField).then(result => {
        if(result === null || result.length === 0){
            res.send({
                code: "COURSE-NOT-FOUND",
                message: "WALA PANG NAKALAGAY NA COURSE WITH THAT ID BHIE!"
            })
        }else{
            res.send({
                code: "COURSE-ARCHIVED-SUCCESSFULLY",
                message: `Course ID: ${courseId.toUpperCase()} is now archived`,
                result: result
            })
        }
    })
}

//Unarchive course
module.exports.activateCourse = (req, res) => {
    const {courseId} = req.params;
    const updateField = {
        isActive : true
    }

    return Course.findByIdAndUpdate(courseId, updateField).then(result => {
        if(result === null || result.length === 0){
            res.send({
                code: "COURSE-NOT-FOUND",
                message: "WALA PANG NAKALAGAY NA COURSE WITH THAT ID BHIE!"
            })
        }else{
            res.send({
                code: "COURSE-ACTIVATED-SUCCESSFULLY",
                message: `Course ID: ${courseId.toUpperCase()} is now available!`,
                result: result
            })
        }
    })
}

//