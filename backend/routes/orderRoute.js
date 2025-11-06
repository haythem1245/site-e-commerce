const express = require('express');
const verifToken = require('../middlewares/verifToken');
const verifRole = require('../middlewares/verifRole');
const router = express.Router();
const orderController = require('../controllers/orderController');
router.post('/create',verifToken,orderController.createOrder);
router.get('/',verifToken,orderController.getMyOrders);
router.get('/orders',verifToken,verifRole("admin"),orderController.getAllOrders);
module.exports = router;