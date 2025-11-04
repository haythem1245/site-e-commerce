const express = require('express');
const verifToken = require('../middlewares/verifToken');
const verifRole = require('../middlewares/verifRole');
const upload = require ('../middlewares/multer');
const router = express.Router();
const productController = require('../controllers/productController');
router.post('/product',verifToken,verifRole("admin"),upload.single("images"),productController.ajoutProduct);
router.get('/products/:category',productController.getProductByCategirie);
router.get('/product/:id',productController.getProductById);
router.get('/products',productController.getAllProducts);
router.put('/product/:id',verifToken,verifRole("admin"),upload.single("images"),productController.updateProducts);
router.delete('/product/:id',verifToken,verifRole("admin"),productController.DeletProducts);

module.exports = router;