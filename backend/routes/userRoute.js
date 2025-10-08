const express = require('express');
const router = express.Router();
const { signup, login, getProfile ,updateProfile} = require('../controllers/userController');
router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
module.exports = router;