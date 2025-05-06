const express = require('express');
const app = express();

app.use(express.json());

const authRoutes = require('./Routes/authRoutes');
const crudRoutes = require('./Routes/crudRoutes')

app.use('/api/auth', authRoutes);
app.use('/api',crudRoutes);

module.exports = app; 
