const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const ENV = require('./env');

const app = express()

const db = mysql.createConnection(ENV.MYSQL_DB);

const happyColor = "color:green; font-size:20px;"

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err.stack);
        return;
    }
    console.log('%c Connected to database.', happyColor);
});

app.use(cors());

app.get('/api/health', (req, res) => {
    res.json("check")
});

app.get('/api/lignes', (req, res) => {
    db.query('SELECT * FROM ligne', (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
        res.status(200)
    });
});

app.get('/api/lignes/:ligneId/secteur', (req, res) => {
    const ligneId = req.params.ligneId
    db.query(`SELECT * FROM secteur WHERE ligne_id = ${mysql.escape(ligneId)}`, (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

app.get('/api/secteur/:secteurNom/caracteristique', (req, res) => {
    const secteurNom = req.params.secteurNom
    db.query(`SELECT * FROM caracteristique WHERE secteur_nom LIKE ${mysql.escape(secteurNom)}`, (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

app.use(express.json());

app.post('/api/controle', (req, res) => {
    const { caracteristiqueId, valeur, conforme, logDate } = req.body;

    const query = `INSERT INTO controle_log (caracteristique_id, valeur, conforme, logDate) VALUES (?, ?, ?, ?)`;
    const values = [ caracteristiqueId, valeur, conforme, logDate];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(201).json({ message: 'Controle log created successfully', id: results.insertId });
    });
});


const PORT = ENV.PORT || 3000; // Port 3000 is used by default
app.listen(PORT, () => console.log(`%c Server running on port ${PORT}`, happyColor));
