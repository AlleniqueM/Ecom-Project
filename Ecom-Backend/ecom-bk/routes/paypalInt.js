const express = require('express');
const router = express.Router();
const { createOrder } = require('../paypal/paypalC');

// router.post('/create-order', createOrder);

module.exports = router;