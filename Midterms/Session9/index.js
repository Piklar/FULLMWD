const express = require("express");
const mongoose = require("mongoose");
const server = express();
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Mongoose setup and connection
mongoose.connect("mongodb+srv://admin:admin123@ua-database.h9pp0.mongodb.net/prac_lib?retryWrites=true&w=majority");

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("We're connected to mongoDB"));

// Schema
const librarySchema = new mongoose.Schema({
    title: String,
    author: String,
    publishedDate: Date,
  	genre: String,
	price: Number
})

// MODEL
const Library = mongoose.model("Library", librarySchema);

// middlewares
server.use(express.json());
server.use(express.urlencoded({extended:true}));

// Operations

// Adding a Book within the Library, If same will not add duplicate
server.post("/book/add", (req, res) => {
    Library.findOne({ title: req.body.title }).then((result) => { 
        if (result !== null) {
            return res.send({
                code: 0,
                message: "Duplicate Found!",
                data: result
            });
        } else {
            let newBook = new Library({
                title: req.body.title,
                author: req.body.author,
                publishedDate: req.body.publishedDate,
                genre: req.body.genre,
                price: req.body.price
            });

            newBook.save().then((savedBook, saveErr) => {
                if (saveErr) {
                    return console.error(saveErr);
                } else {
                    return res.send({
                        code: 200,
                        message: "Book Added!",
                        data: savedBook
                    });
                }
            });
        }
    });
});

// Getting all the list
server.get("/book/search", (req, res) => {
    Library.find({}).then((result, err) => {
        if(err){
            return res.send("ERROR!")
        }else{
            return res.send({
                code: 200,
                message: "LIST OF ALL BOOKS",
                result: result
            });
        }
    })
})

// Searching Book using BookID
server.get("/book/search/:bookId", (req, res) => {
const bookID = req.query;

    Library.findById(req.params.bookId, bookID).then((result, err) => {
        if(err){
            return res.send({
                message: "There is a server error."
            });
        }else{
            if(result == null){
                res.send({
                    message: "Cannot find book with the given ID."
                });
            }else{
                res.send({
                    message: "ONE BOOK RETRIEVED!",
                    result: result
                });
            };      

        };
    });
});

// Updating a book. BookID sa URL, sa Query Params yung update
server.put("/book/update/:bookid", (req, res) => {
    const updateData = req.query;

    Library.findByIdAndUpdate(req.params.bookid, updateData, { new: true })
        .then((result, err) => {
            if (err) {
                return res.send({
                    message: "There is a server error."
                });
            } else {
                if (result == null) {
                    res.send({
                        message: "Cannot update the book as there are no records of the selected ID."
                    });
                } else {
                    res.send({
                        message: "UPDATE OF THE BOOK IS DONE!",
                        result: result
                    });
                }
            }
        });
});

// Deleting a book using BookID
server.delete("/book/delete/:bookId", (req, res) => {
    Library.findByIdAndDelete(req.params.bookId).then((result, err) => {
        if(err){
            return res.send({
                message: "There is a server error."
            });
        }else{
            if(result == null){
                res.send({
                    message: "Cannot find book with the given ID."
                });
            }else{
                res.send({
                    message: "THE BOOK HAS BEEN DELETED!",
                    result: result
                });
            };      

        };
    });
});

// Books na higher or equal sa 1000 yung price
server.get("/book/highPrice", (req, res) => {
    Library.find({ price: { $gte: 1000 } }).then((result, err) => {
        if(err){
            return res.send({
                message: "There is a server error."
            });
        }else{
            if(result == null){
                res.send({
                    message: "There are no books higher than 1000"
                });
            }else{
                res.send({
                    message: "HERE ARE THE LIST OF BOOKS THAT ARE PRICED 1000 AND ABOVE!",
                    result: result
                });
            };      

        };
    });
});

// Books na lower or equal sa 1000
server.get("/book/lowPrice", (req, res) => {
    Library.find({price: { $lte: 1000}}).then((result, err) => {
        if(err){
            return res.send({
                message: "There is a server error."
            });
        }else{
            if(result == null){
                res.send({
                    message: "There are no books lower than 1000"
                });
            }else{
                res.send({
                    message: "HERE ARE THE LIST OF BOOKS THAT ARE PRICED 1000 BELOW!",
                    result: result
                });
            };      

        };
    });
});

// How to get all books with same genre 
// Sa Query Params siya masesearch
server.get("/books/search/genre", (req, res) => {
    Library.find({ genre: req.body.genre }).then((result, err) => {
        if (err) {
            return res.send({
                message: "There is a server error."
            });
        } else {
            if (result.length === 0) {
                res.send({
                    message: "No books found for the specified genre."
                });
            } else {
                res.send({
                    message: "Books retrieved successfully!",
                    result: result
                });
            }
        }
    });
});