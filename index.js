const express = require('express');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const authenticate = require('./middleware/authenticate');
const users = require('./routes/users');
const decks = require('./routes/decks');
const cards = require('./routes/cards');
const study = require('./routes/study');
const errorHandler = require('./errorHandler');
const path = require("path");
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/decoraMED';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => {
    console.error('Could not connect to MongoDB...', err);
    process.exit(1);
  });

const app = express();

app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Middleware
const cors = require('cors');
app.use(cors());
app.use(express.json());
//app.use((req, res, next) => {console.log(req); next();})
app.use('/api/auth', auth);
app.use('/api', authenticate);
app.use('/api/users', users);
app.use('/api/decks', decks);
app.use('/api/cards', cards);
app.use('/api/study', study)
app.use('*',  (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
