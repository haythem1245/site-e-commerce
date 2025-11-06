const express = require('express');
const verifToken = require('../middlewares/verifToken');
const verifRole = require('../middlewares/verifRole');
const router = express.Router();
const userController = require('../controllers/userController')
router.post('/signup',userController.signup);
router.post('/login',userController.login);
router.get('/profile/:id',verifToken,verifRole("admin"),userController.getProfile);
router.get('/profiles',verifToken,verifRole("admin"),userController.getAllProfile);
router.put('/profile',userController.updateProfile);
router.get('/me', verifToken,userController.getMyProfile);
router.put('/me',verifToken,userController.updateMyProfile);
router.delete('/profile/:id', verifToken, verifRole("admin"), userController.deleteUser);

module.exports = router;