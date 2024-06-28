const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const app = express();
const Routes = require('./routes/routes');
const db = require('./config/db');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 6377;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({
  extended: true
}));

// Static folder to server uploaded files
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));
app.use('/uploads/pdfs', express.static(path.join(__dirname, 'uploads/pdfs')));

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));

// Session middleware
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", Routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
  next();
});

// Default backend route "/"
app.get('/', (req, res) => {
  console.log("This is the API!");
  res.send('This is the API!');
});

// Test MySQL connection at startup
db.getConnection()
  .then(connection => {
    console.log('Connected to MySQL database');
    connection.release();
  })
  .catch(error => {
    console.error('Error connecting to database: ', error);
    process.exit(1); //Exit process if connection fails
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});