const express = require('express');
const router = express.Router();
const authenticateToken = require('../Middleware/auth');
const { createItem,getItems,updateItem,deleteItem } = require('../Controllers/CrudController');

// Protect routes with the authenticateToken middleware
router.post('/create', authenticateToken, createItem);
router.get('/getItem', authenticateToken, getItems);
router.put('/update/:id', authenticateToken, updateItem);
router.delete('/delete/:id', authenticateToken, deleteItem);

module.exports = router;
