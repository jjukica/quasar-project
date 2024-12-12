const express = require("express");
const cors = require("cors");  // Import cors
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Enable CORS for requests from localhost:9000 (Quasar frontend)
app.use(cors({
    origin: 'http://localhost:9000',  // Allow requests from your Quasar frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization']  // Allow specific headers
}));

// Parser for JSON data
app.use(bodyParser.json());

// Parser for data from forms
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection setup
const connection = mysql.createConnection({
    host: 'ucka.veleri.hr',
    user: 'jjukica',
    password: '11',
    database: 'jjukica'
});

app.use(express.urlencoded({ extended: true }));

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL!");
});

// Define your API routes

app.get("/api/knjige", (req, res) => {
    connection.query("SELECT * FROM knjiga", (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

app.get("/api/knjige/:id", (req, res) => {
    const id = req.params.id;
    res.send("jedna knjiga " + id);
});

app.get("/api/knjige/:autor", (req, res) => {
    const autor = req.params.autor;  // Use the correct variable
    connection.query("SELECT * FROM knjiga WHERE autor LIKE ?", [`%${autor}%`], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

app.post("/api/rezerv_knjige", (req, res) => {
    const data = req.body;
    const rezervacija = [[data.datum, data.id_knjiga, data.id_korisnik]];
    connection.query("INSERT INTO rezervacija (datum_rez, knjiga, korisnik) VALUES ?", [rezervacija], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log("Server running at port: " + port);
});
