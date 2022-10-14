const express = require('express');

const PORT = process.env.PORT || 3001;


const app = express();

const { notes } = require('./db/db.json');

// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');
//parse incoming string or array data
app.use(express.urlencoded({ extended:true }));
//parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

// // Use apiRoutes
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

app.get('/api/db', (req, res) => {
  res.json(notes);
});

app.post('/api/db', (req, res) => {
  // req.body is where our incoming content will be
  console.log(req.body);
  res.json(req.body);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });