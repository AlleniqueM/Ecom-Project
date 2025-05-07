const express = require('express');
const router = express.Router();
const db = require('../../database');
const bcrypt = require('bcrypt');
const { authenticateToken } = require('../../middleware/auth');

// Check if user is admin 
const requireAdmin = (req, res, next) => {
    if (!req.user  || !req.user.role) {
        return res.status(403).json({ message: 'Access denied. Admin role requires.'});
    }
    next();
};

// Get all users
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT user_id, email, first_name, last_name, role, created_at FROM users'
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users'});
    }
});

// Get one user 
router.get('/:user_id', authenticateToken, requireAdmin, async (req, res)=>{
    try {
        const user_id = req.user.id; 
        
        const [rows] = await db.execute('SELECT user_id, email, first_name, last_name, role, created_at FROM users WHERE user_id = ?', [user_id]);
        
        if (rows.length === 0){
            return res.status(404).json({ message: 'User not found'});
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user'});
    }
});

// Update user role
router.patch('/:user_id/role', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const user_id = req.user.id;
        const { role } = req.body;

        if(role === undefined || typeof role !== 'boolean') {
            return res.status(400).json({ message: 'Role must be a boolean value'});
        }

        const [result] = await db.execute('UPDATE users SET role = ? WHERE user_id = ?', [role, user_id]);
        if(result.affectedRows === 0){
            return res.status(404).json({ message: 'User not found'});
        }
        res.json({ message: 'User role upate successfully'});
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Error updating user role'});
    }
});
// Delete user


module.exports = router;