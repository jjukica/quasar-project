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

// Connect to MySQL
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL!");
});

// Define your API routes

// Get all books
app.get("/api/knjige", (req, res) => {
    connection.query("SELECT * FROM knjiga", (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

// Get reserved books with additional user info
app.get("/api/rezervirane_knjige", (req, res) => {
    const query = `
        SELECT rezervacija.id, rezervacija.datum_rez, knjiga.naslov, knjiga.autor, korisnik.ime, korisnik.prezime
        FROM rezervacija
        JOIN knjiga ON rezervacija.knjiga = knjiga.id
        JOIN korisnik ON rezervacija.korisnik = korisnik.id
    `;
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

// Get a single book by ID (This seems to be a placeholder)
app.get("/api/knjige/:id", (req, res) => {
    const id = req.params.id;
    res.send("jedna knjiga " + id);
});

// Get books by author
app.get("/api/knjige/:autor", (req, res) => {
    const autor = req.params.autor;  // Use the correct variable
    connection.query("SELECT * FROM knjiga WHERE autor LIKE ?", [`%${autor}%`], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

// Add a new book (this is the new route you'll need to add)
app.post("/api/knjige", (req, res) => {
    const { naslov, autor, opis, slika, stanje } = req.body;

    // SQL query to insert a new book into the 'knjiga' table
    const query = `INSERT INTO knjiga (naslov, autor, opis, slika, stanje) VALUES (?, ?, ?, ?, ?)`;
    const values = [naslov, autor, opis, slika, stanje];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error("Error inserting book:", error);
            res.status(500).send("Error inserting book");
            return;
        }
        res.status(201).send("Book inserted successfully");
    });
});

// Reserve a book (already existing)
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
