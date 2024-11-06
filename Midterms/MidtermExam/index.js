const express = require("express");
const mongoose = require("mongoose");
const server = express();
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. Welcome to your server!`);
});

// Mongoose setup and connection
mongoose.connect("mongodb+srv://admin:admin123@ua-database.h9pp0.mongodb.net/user?retryWrites=true&w=majority");

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("We're connected to mongoDB"));

// Schema
const userSchema = new mongoose.Schema({
    firstname  : String,
    lastname   : String,
    email      : String,
  	password   : String,
	gender     : String
})

// MODEL
const User = mongoose.model("User", userSchema);

// middlewares
server.use(express.json());
server.use(express.urlencoded({extended:true}));

// Operations

// Adding a User within the Database, If same will not add duplicate
server.post("/register", (req, res) => {
    User.findOne({ email: req.body.email }).then((result) => { 
        if (result !== null) {
            return res.send({
                code: 0,
                message: "Duplicate Found!",
                data: result
            });
        } else {
            let newUser = new User({
                firstname : req.body.firstname,
                lastname  : req.body.lastname,
                email     : req.body.email,
                password  : req.body.password,
                gender    : req.body.gender
            });

            newUser.save().then((savedUser, saveErr) => {
                if (saveErr) {
                    return console.error(saveErr);
                } else {
                    return res.send({
                        code: 200,
                        message: "User Added!",
                        data: savedUser
                    });
                }
            });
        }
    });
});

// Getting all the list
server.get("/all", (req, res) => {
    User.find({}).then((result, err) => {
        if(err){
            return res.send("ERROR!")
        }else{
            return res.send({
                code: 200,
                message: "LIST OF ALL USERS",
                result: result
            });
        }
    })
})

// Searching User using Email. Put http://localhost:4000/search?email=(what is the email)
server.get("/search", (req, res) => {
    const email = req.query.email;

    User.findOne({ email: email })
        .then((result) => {
            if (!result) {
                return res.send({
                    message: "Cannot find a user with the email you have provided."
                });
            } else {
                return res.send({
                    message: "USER RETRIEVED!",
                    result: result
                });
            }
        })
        .catch((err) => {
            res.send({
                message: "There is a server error.",
                error: err
            });
        });
});


// Updating a User. UserID sa URL, sa Query Params yung update
server.put("/edit/:userid", (req, res) => {
    const updateData = req.query;

    User.findByIdAndUpdate(req.params.userid, updateData, { new: true })
        .then((result, err) => {
            if (err) {
                return res.send({
                    message: "There is a server error."
                });
            } else {
                if (result == null) {
                    res.send({
                        message: "Cannot update the user as there are no records of the selected UserID."
                    });
                } else {
                    res.send({
                        message: "UPDATE OF THE USER HAS BEEN DONE!",
                        result: result
                    });
                }
            }
        });
});

// Deleting a user using UserID
server.delete("/delete/:userid", (req, res) => {
    User.findByIdAndDelete(req.params.userid).then((result, err) => {
        if(err){
            return res.send({
                message: "There is a server error."
            });
        }else{
            if(result == null){
                res.send({
                    message: "There are no user with the given UserID."
                });
            }else{
                res.send({
                    message: "THE USER HAS BEEN DELETED!",
                    result: result
                });
            };      

        };
    });
});