const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'fill the password',
  database: 'todo'
});

db.connect(() => console.log('Connected to DB'));

app.get('/', (req, res) => {
  db.query('SELECT * FROM todoItems', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.post('/add-item', (req, res) => {
  db.query(
    'INSERT INTO todoItems (itemDescription) VALUES (?)',
    [req.body.text],
    () => res.send('Item added')
  );
});

app.put('/edit-item', (req, res) => {
  db.query(
    'UPDATE todoItems SET itemDescription = ? WHERE ID = ?',
    [req.body.itemDescription, req.body.ID],
    () => res.send('Item updated')
  );
});

app.delete('/delete-item/:id', (req, res) => {
  db.query(
    'DELETE FROM todoItems WHERE ID = ?',
    [req.params.id],
    () => res.send('Item deleted')
  );
});

app.listen(3000, () => console.log('Server running on port 3000'));



