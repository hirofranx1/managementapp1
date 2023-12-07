const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const mysql = require('mysql');


app.use(cors({
    origin: ['http://localhost:5173'],
}));

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "tigum_data"
});

db.connect((error) => {
    if (error) {
        console.log("Error connecting to database");
    }else{
    console.log('Connected');
    }
});


//write code here

app.get('/',(req, res)=>{
    res.send({message: 'hello world'})
})


app.get('/getUsers',(req, res)=>{
    db.query('SELECT * FROM users',(err, data)=>{
        if(err){
            return res.status(500).json({ error: 'Error executing query' });
        }else{
            res.send(data);
        }
    });
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    db.query(
      'SELECT admin_password FROM admin_cred WHERE admin_username = ?',
      [email],
      (err, data) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Error executing query' });
        } else {
          if (data.length > 0) {
            const storedPassword = data[0].admin_password;
            if (storedPassword === password) {
              // Passwords match, login successful
              res.json({ message: 'Login successful' });
            } else {
              // Passwords don't match, login failed
              res.status(401).json({ error: 'Invalid email or password' });
            }
          } else {
            // No user found with the given email
            res.status(404).json({ error: 'User not found' });
          }
        }
      }
    );
  });  










//end of code
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});