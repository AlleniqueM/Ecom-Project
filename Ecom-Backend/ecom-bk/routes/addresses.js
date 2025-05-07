const express = require('express');
const addressdb = require('../models/address');
const router = express.Router();

// Add address information || USER ADDS ADDRESS INFORMATION
router.post('/:address_id/add', async (req, res) => {
    try {
        const { user_id } = req.body;
        const { street } = req.body;
        const { city} = req.body;
        const { state } = req.body;
        const { postal_code } = req.body;
        const { country } = req.body;

        const newAddress = await addressdb.addAddress(user_id, street, city, state, postal_code, country);
        res.status(201).json({ message: 'Address added', newAddress });
    } catch (error) {
        console.error('Could not add address:', error.message);
        res.status(500).json({ error: 'Could not add address' });
    }
});


// Update address by address id || USER UPDATES ADDRESS
router.put('/:address_id/update', async (req, res) => {
    try {
        const { address_id } = req.body;
        const { street } = req.body;
        const { city} = req.body;
        const { state } = req.body;
        const { postal_code } = req.body;
        const { country } = req.body;

        const updatedAddress = await addressdb.updateAddress(addressdb, address_id, { street, city, state, postal_code, country});

        if (updatedAddress) {
            res.status(200).json({ message: 'Address updated ', updatedAddress });
        } else {
            res.status(404).json({ message: 'Address not found' });
        }
    } catch (error) {
        console.error('Could not update address:', error.message);
        res.status(500).json({ error: 'Could not update address' });
    }
});
// Remove address by address id || USER DELETES AN ADDRESS
router.delete('/:address_id/remove', async (req, res) => {
    try {
        const { user_id } = req.body;
        const { address_id } = req.body;

        const removedAddress = await addressdb.removeAddress(user_id, address_id);
        res.status(200).json({ message: 'Address removed', removedAddress });
    } catch (error) {
        console.error('Could not remove address:', error.message);
        res.status(500).json({ error: 'Could not remove address' });
    }
});

module.exports = router;
 