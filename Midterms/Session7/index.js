const express = require("express");
const app = express();

const port = 4000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Requests
// Get Methods
app.get("/", (req, res) => {
    res.send("Hello World! Ohayo Sekai, Good Morning World!!!");
})

let users = [];

app.get("/hello", (req, res) => {
    res.send("Hello from /hello endpoint.");
})

app.get("/secret", (req, res) => {
    res.send("Ang Pogi ni Ernz Danielle Manalo!!!");
})

app.post("/hello", (req, res) => {
    res.send(`Hello ${req.body.firstName} ${req.body.lastName}!`);
})

app.post("/register", (req, res) => {
    if(req.body.Username !== "" && req.body.Password !== ""){
        users.push(req.body);
        res.send(`User ${req.body.Username} is now registered!`);
    }else {
        res.send("Please enter correct username or password!");
    }
})

app.delete("/delete-user", (req, res) => {
    if(users.length > 0){
        users.pop();
        res.send("You have successfully deleted a user! Congrats!")
    }else{
        res.send("There is no registered user.")
    }
})

app.listen(port, () => console.log("Server is running at port number " + port));


// Assignment

app.get("/get-users", (req, res) => {
    if(users.length > 0){
        res.send({users});
    }else{
        res.send("There are no registered users");
    }
})

app.get("/try", (req, res) => {
        res.send({users});
});