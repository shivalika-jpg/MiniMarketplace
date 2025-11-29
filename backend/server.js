// server.js
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(express.json()); // for JSON bodies

// routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// static uploads if you used local storage
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
