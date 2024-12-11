const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS middleware
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const swaggerDocs = require('./config/swagger');

const app = express();

// Connect to the database
connectDB();

// Use body-parser for JSON parsing
app.use(bodyParser.json());

// Enable CORS for all routes and origins
app.use(cors());

// API routes
app.use('/api/auth', authRoutes);

// Swagger documentation
swaggerDocs(app);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
