const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Parser za JSON podatke
app.use(bodyParser.json());

// Parser za podatke iz formi
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'ucka.veleri.hr',
    user: 'jjukica',
    password: '11',
    database: 'jjukica'
});

app.use(express.urlencoded({ extended: true }));

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.listen(port, () => {
    console.log("Server running at port: " + port);
});
