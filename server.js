const express = require('express');
const path = require('path');
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const countryData = require("./countries.json")
var corsOptions = {};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://tk9292:a1b2c3@cluster0.tvfxm.mongodb.net/balink?retryWrites=true&w=majority", function (err, database) {
    if (err) {
        console.log("Error: " + err);
    }
    else {
        console.log("We're connected to MongoDB, Database: " + database.name);
    }
});

var Customer = mongoose.model("Customer", {
    firstName: String,
    lastName: String,
    title: String,
    country: String,
    city: String,
    street: String,
    email: String,
    phone: String,
    option: Boolean,

});

app.post("/customers", function (request, response) {
    var customer = new Customer(request.body);
    customer.save(function (err, customer) {
        if (err) {
            console.log("Error: " + err);
            response.status(500);
            response.send(err);
        }
        else {
            response.status(201); // 201 = Created
            response.send(customer);
        }
    });
});



app.get("/countries", function (request, response) {
    response.send(countryData); // Default Status = 200
});


app.use(express.static(__dirname + '/dist/balinkhw'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/dist/balinkhw/index.html'));});
app.listen(process.env.PORT || 8080,function(){
    console.log("Listening on http://localhost:8080");
});;



//model
