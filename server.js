const express = require('express');
const connectDB = require('./config/db');

const LocationMap = require('./models/LocationMap');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Init route maps
locationMap = new LocationMap()

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/locations', require('./routes/api/locations'));
app.use('/api/bus-routes', require('./routes/api/busRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

