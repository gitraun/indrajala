const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController');
const jwtMiddleWare = require('../middleware/jwtMiddleware');

router.get('/profile', jwtMiddleWare, profileController.getProfile);
router.put('/profile', jwtMiddleWare, profileController.updateUserProfile);
router.delete('/profile', jwtMiddleWare, profileController.deleteUserProfile);

module.exports = router;