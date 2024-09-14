const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('public')); // Serve static files

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Ensure uploads directory exists
fs.mkdirSync('uploads', { recursive: true });

// Route to handle video uploads
app.post('/upload', upload.single('video'), (req, res) => {
  res.redirect('/');
});

// Route to list uploaded videos
app.get('/videos', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    if (err) {
      res.status(500).send('Error reading videos');
    } else {
      res.json(files);
    }
  });
});

// Route to serve video files
app.get('/videos/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  res.sendFile(filePath);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
