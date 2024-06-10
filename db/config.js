// Import mongoose
const mongoose = require('mongoose');

// MongoDB connection URI from .env file
const dbURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });