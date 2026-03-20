const express = require('express');
const app = express();
require('dotenv').config();

const connectDB = require('./config/db');
connectDB();
const config = require('./config/config');
app.use(express.json());

// Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Import routes
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Use routes
app.use('/api', userRoutes);

// Server
// const PORT = process.env.PORT || 3000;

app.listen(config.port, () => {
    console.log(`${config.appName} running on port ${config.port}`);
});

app.use(errorHandler);