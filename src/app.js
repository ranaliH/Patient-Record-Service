const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3001;

// Database connection details
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Middleware to parse JSON bodies
app.use(express.json());

// Test database connection
db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Endpoint to get all patient records
app.get('/patients', (req, res) => {
  db.query('SELECT * FROM patients', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Endpoint to create a new patient record
app.post('/patients', (req, res) => {
  const { name, age, medicalHistory, prescriptions, labResults } = req.body;
  const query = 'INSERT INTO patients (name, age, medicalHistory, prescriptions, labResults) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, age, medicalHistory, prescriptions, labResults], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, name, age, medicalHistory, prescriptions, labResults });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Patient Record Service is running on port ${port}`);
});
