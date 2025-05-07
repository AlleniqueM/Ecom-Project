const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcrypt');
const user = require('../models/users');
const { authenticateToken, adminOnly } = require('../middleware/auth');

// Admin Route req. Auth, Admin role
router.get('/admin/users', authenticateToken, adminOnly,  async (req, res) => {
  //Check if user is admin
  if (!req.user.role) {
    return res.status(403).json({ message: 'Access denied. Admin role required.'});
  }
  try {
    const users = await user.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message});    
  }
  
});

// See user profile
router.get('/profile', authenticateToken, async (req, res) => {
try {
  const profile = await user.getUserById(req.user.id)
  if (rows.length === 0) {
    return res.status(404).json({ message: 'User not found'});
  }

  res.json({
      user_id: profile.id,
      email: profile.email,
      first_name: profile.first_name,
      last_name: profile.last_name
    });
} catch (error) {
  console.error('Profile lookup error:', error);
  res.status(500).json({ message: 'Server error' });
}
});

// Change user profile info
router.put('/profile', authenticateToken, async (req, res) => {
  try {
      const { first_name, last_name, email} = req.body;
      if (!first_name || !last_name || !email) {
        return res.status(400).json({ message: 'All fields are required'});
      }
      
      await user.updateUser(req.user.id, {first_name, last_name, email})
      res.json({ message: 'Profile updated successfully'});
    } catch (error) {
      console.log('Error updating user_profile: ', error.message);
      res.status(500).json({ error: 'Failed to update user'});
    }
});
// Change password
router.put('/me/password', authenticateToken, async (req, res) => {
  try {
    await user.updatePassword(req.user.id, req.body.currentPassword, req.body.newPassword);
    res.json({ message: "Password updated" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Delete user
router.delete("/:user_id", authenticateToken,adminOnly, async (req, res) => {
   try {
    await user.delete(req.params.user_id);
    res.json({ message: "User deleted"})
   } catch (error) {
      res.status(500).json({ error: 'Deletion failed'})
   }
  });



module.exports = router;