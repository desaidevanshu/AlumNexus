// routes/blogRoutes.js
const express = require('express');
const { createBlog, getBlogs } = require('../controllers/blogController');

const router = express.Router();

// Route to create a new blog post
router.post('/create', createBlog);

// Route to get all blog posts
router.get('/', getBlogs);

module.exports = router;
