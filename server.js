const express = require('express');
const fs = require('fs');
const path = require('path');
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

function createNewNote(body, notesArray) {
  const note = body;

  notesArray.push(note);

  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );

  return note;
}

app.get('/api/db', (req, res) => {
  res.json(notes);
});

app.post('/api/db', (req, res) => {
  // req.body is where our incoming content will be
  const note = createNewNote(req.body, notes);
  res.json(note);
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', (req,res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });