const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();

// Get all blogs
router.get('/', async (req, res) => {
    const blogs = await Blog.find();
    res.json(blogs);
});

// Create a new blog
router.post('/', async (req, res) => {
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.json(savedBlog);
});

// Like a blog
router.patch('/:id/like', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    blog.likes += 1;
    await blog.save();
    res.json(blog);
});

// Unlike a blog
router.patch('/:id/unlike', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    blog.likes = Math.max(0, blog.likes - 1);
    await blog.save();
    res.json(blog);
});

module.exports = router;
