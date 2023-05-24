// const express = require("express");
// require("../src/db/conn");
// const men=require("../src/models/mens");
// const app = express();
// app.get("/",(req,res) => {
//     res.send("hello");
// });
// app.post("/mens",(req,res)=>{

// });
// app.listen(8000,()=>{
//     console.log("connected");
// });

const path= require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const staticpath=path.join(__dirname,"./public");
app.use(express.static(staticpath));

// Parse requests of content-type 'application/json'
app.use(bodyParser.json());

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Password$2',
  database: 'mydb'
});

// Handle GET request to retrieve all users
app.get('/users', (req, res) => {
  const sql="select* from users"
  pool.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// Handle POST request to create a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  var sql = "INSERT INTO users (name, email) VALUES (?,?)";
  pool.query(sql,[name, email], function (err, result){
    if (err) throw err;
    res.send('User created successfully.');
 });
});

// Handle PUT request to update a user by ID
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const sql="UPDATE users SET name = ?, email = ? WHERE id = ?"
  pool.query(sql, [name, email, id], (error, result) => {
    if (error) throw error;
    res.send('User updated successfully.');
  });
});

// Handle DELETE request to delete a user by ID
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM users WHERE id = ?', id, (error, results) => {
    if (error) throw error;
    res.send('User deleted successfully.');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
