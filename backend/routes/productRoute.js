const express = require('express');
const verifToken = require('../middlewares/verifToken');
const verifRole = require('../middlewares/verifRole');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/product/:id',productController.getProductById);
router.get('/products',verifToken,verifRole("admin"),productController.getAllProducts);
router.put('/product',productController.updateProducts);
module.exports = router;