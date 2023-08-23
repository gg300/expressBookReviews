const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
    if((!username) || (!password)){
            res.send("Username or password was not provided").statusCode(400);
        }
    else{
        if(users[username]){
            res.send("User already exists").statusCode(400);
        }
        else{
            users.push({"username":username,"password":password});
            res.send("User succesfully added").statusCode(200);
    }
}
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    bucs = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve( res.send(books))
        },2000)})
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    bucs2 = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve( res.send(books[req.params.isbn]))
        },2000)})
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author
    function pl(author){        
        for (num in books){
            if(books[num].author === author){
                res.send(books[num]).statusCode(200);
            }
        }}
    bucs3 = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve(pl(author))
        },2000)})
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title
    function pl1(title){        
        for (num in books){
            if(books[num].title === title){
                res.send(books[num]).statusCode(200);
            }
        }}
    bucs4 = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve(pl1(title))
        },2000)})
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn
            res.send(books[isbn].reviews).statusCode(200);
});

module.exports.general = public_users;
