// MongoDB Cheatcode

// For to Insert data in Database in MongoDB. Inserting 1 data

db.users.insertOne({
    firstName: "Ernz",
    lastName: "Manalo",
    age: 21,
    contact: {
        phone: "09158158735",
        email: "ernzmanalo2003@gmail.com"
    },
    courses: ["CSS", "JS", "PYTHON"],
    department: "none"
});

// Insert Multiple Records in mongoDB
db.users.insertMany([{
    firstName: "Stephen",
    lastName: "Hawking",
    age: 76,
    contact: {
        phone: "09158198735",
        email: "prelimgods@gmail.com"
    },
    courses: ["CSS", "Telnet", "Cisco"],
    department: "none"
},
{
    firstName: "Neil",
    lastName: "Armstrong",
    age: 82,
    contact: {
        phone: "09158198729",
        email: "astronaught@gmail.com"
    },
    courses: ["React", "SASS", "Laravel"],
    department: "none"
}]);

// Selecting records in mongoDB
db.users.find();

// Selecting records in mondoDB with criteria
db.users.find({
    firstName: "Stephen"
});

db.users.find({
    department: "none", age:82
});

// Updating a record in mongoDB
db.users.insertOne({
    firstName: "Test",
    lastName: "Test",
    age: 0,
    contact: {
        phone: "09123456789",
        email: "test@gmail.com"
    },
    courses: ["test", "Test", "TEST"],
    department: "none"
});

db.users.updateOne({firstName: "Test"}, {
    $set: {
            firstName: "Bill",
            lastName: "Gates",
            age: 65,
            contact: {
                phone: "09123456789",
                email: "billgates@gmail.com"
            },
            courses: ["Microsoft", "HTML", "Cisco"],
            department: "Operations", 
            status: "Active"     
    }
});

// Update Multiple Records
db.users.updateMany({department: "none"},
    {
        $set: {
            department: "HR"
        }
    }
);

// Find Records with comparison operators
// Greater Than
db.users.find({age : {$gt : 50}});

// Greater Than and Equal to
db.users.find({age : {$gte : 50}});

// Less Than
db.users.find({age : {$lt : 50}});

// Less Than and Equal to
db.users.find({age : {$lte : 50}});