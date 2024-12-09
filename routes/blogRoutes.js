const express = require('express');
const router = express.Router();
const jwtMiddleWare = require('../middleware/jwtMiddleware');
const multerMiddleware = require('../middleware/blogMulterMiddleware');

const blogController = require('../controllers/blogController');

router.post('/blog', jwtMiddleWare, multerMiddleware.single('image'), blogController.createBlog);
router.get('/blog', jwtMiddleWare, blogController.getAllBlogs);
router.put('/blog', jwtMiddleWare, multerMiddleware.single('image'), blogController.updateBlog);
router.delete('/blog', jwtMiddleWare, blogController.deleteBlog);
router.post('/blog/:id/like', jwtMiddleWare, blogController.likePost);


module.exports = router;