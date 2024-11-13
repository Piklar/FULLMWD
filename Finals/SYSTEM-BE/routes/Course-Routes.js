const express = require("express");
// Express routing component
const router = express.Router();
const courseController = require("../controllers/Course-Controllers.js");

// Create Course
router.post("/", courseController.addCourse);

// Get all courses
router.get("/all", courseController.getAllCourses);

module.exports = router;