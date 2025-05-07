const express = require('express');
const router = express.Router();
const { authenticateToken, adminOnly } = require('../../middleware/auth');

// Admin dashboard
router.get('/dashboard', authenticateToken, adminOnly, (req, res)=>{
    res.json({ message: 'Admin dashboard'});
  
});




module.exports = router;