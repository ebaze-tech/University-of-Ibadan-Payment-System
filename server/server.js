const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const app = express();
const UserRoutes = require('./routes/userRoutes');
const AuthRoutes = require('./routes/authRoutes');
const GoogleOAuthRoutes = require('./routes/googleOAuthRoute');

const db = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

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
app.use('/api/user', UserRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/google', GoogleOAuthRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start MySQL server
db.getConnection((error, connection) => {
  if(error){
    console.error('Error connecting to database: ', error);
   throw error;
  }
  console.log('Connected to MySQL database');
  connection.release();
})

// SQL database listener
db.on('error', (err) => {
  console.error('MySQL pool error: ', err);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});