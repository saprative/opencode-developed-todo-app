const express = require('express');
const app = express();
const path = require('path');
const appDir = '.';

// Serve the todo app files
app.use(express.static(path.join(__dirname, appDir)));

const port = 3000;
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});