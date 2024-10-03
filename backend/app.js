const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');
const auth = require('./middlewares/auth');
const blogRoutes = require('./routes/blogs');
const userRoutes = require('./routes/users');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/blog-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(flash());

app.use('/blogs', auth, blogRoutes); // Protect blog routes with auth middleware
app.use('/users', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
