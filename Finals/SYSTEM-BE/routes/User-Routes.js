const express = require("express");
// Express routing component
const router = express.Router();
const userController = require("../controllers/User-Controllers.js");

// User Registration
router.post("/register", userController.registerUser);




module.exports = router;