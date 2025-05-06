require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); 
// const authRoutes = require('./Routes/authRoutes');
// const crudRoutes = require('./Routes/crudRoutes')

// const app = express();

const app = require('./app');

const port = process.env.PORT || 5000;

// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api',crudRoutes);

// connectDB();
beforeAll(async () => {
  await connectDB(); // not just connectDB()
});


const connection = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.log("MongoDB connection error:", err);
  }
};

connection();
