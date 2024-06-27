const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const app = express();
const Routes = require('./routes/routes');
const db = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 6377;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

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

// Default backend route "/"
app.get('/', (req, res) => {
  console.log("This is the API!");
  res.send({
    message: 'This is the API!'
  })
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});