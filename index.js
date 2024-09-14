const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(morgan('dev'));

// A simple route to test the server
app.get('/', (req, res) => {
  res.send('Welcome to the Video Player App!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
