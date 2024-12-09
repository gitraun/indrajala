const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const multerMiddleware = require('../middleware/multerMiddlware');

router.post('/register', multerMiddleware.single('photo'), userController.register);
router.post('/login', userController.login);

module.exports = router;