const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const mysql = require('mysql');



app.use(cors({
    origin: ['http://localhost:5174'],
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

app.get('/newUsers',(req, res)=>{
    const sql = `SELECT * FROM users WHERE date_created >= DATE_SUB(NOW(), INTERVAL 1 MONTH)`;
    db.query(sql, (err, result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            return res.json({result:result});
        }
    })
})

app.get('/dailyUsers',(req, res)=>{
    const sql = `SELECT * FROM users WHERE latest_activity >= DATE_SUB(NOW(), INTERVAL 1 DAY)`;
    db.query(sql, (err, result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            return res.json({result:result});
        }
    })
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
              res.json({ message: 'Login successful' });
            } else {
              res.status(401).json({ error: 'Invalid email or password' });
            }
          } else {
            res.status(404).json({ error: 'User not found' });
          }
        }
      }
    );
  });  


app.put('/deleteUser',(req, res)=>{
    const {id} = req.body;
    const deleteExpenses = `DELETE expenses FROM expenses LEFT JOIN budget on expenses.budget_id = budget.budget_id WHERE user_id = ?`;
    const deleteReminders = `DELETE reminders FROM reminders WHERE user_id = ?`;
    const deleteBudget = `DELETE budget FROM budget WHERE user_id = ?`;
    const deleteSavingsAdd = `DELETE savings_add FROM savings_add LEFT JOIN savings on savings_add.savings_id = savings.savings_id WHERE user_id = ?`;
    const deleteSavings = `DELETE savings FROM savings WHERE user_id = ?`;
    const deleteUser = `DELETE users FROM users WHERE user_id = ?`;
    console.log(id);
    db.query(deleteExpenses, [id], (err, result)=>{
        if(err){
            console.log(err);
        }else{
            db.query(deleteReminders, [id], (err, result)=>{
                if(err){
                    console.log(err);
                }else{
                    db.query(deleteBudget, [id], (err, result)=>{
                        if(err){
                            console.log(err);
                        }else{
                            db.query(deleteSavingsAdd, [id], (err, result)=>{
                                if(err){
                                    console.log(err);
                                }else{
                                    db.query(deleteSavings, [id], (err, result)=>{
                                        if(err){
                                            console.log(err);
                                        }else{
                                            db.query(deleteUser, [id], (err, result)=>{
                                                if(err){
                                                    console.log(err);
                                                }else{
                                                    res.send(result);
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})











//end of code
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});