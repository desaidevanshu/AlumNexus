// controllers/blogController.js
const Blog = require('../models/Blog');

// Create a new blog post
const createBlog = async (req, res) => {
    const { title, content, author } = req.body;

    try {
        const newBlog = new Blog({ title, content, author });
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all blog posts
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ date: -1 });
        res.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createBlog,
    getBlogs,
};
