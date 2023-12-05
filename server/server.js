const express = require('express');
const app = express();
const port = 6000;
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












//end of code
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});