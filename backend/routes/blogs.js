const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const auth = require('../middlewares/auth');

// Get all blogs
router.get('/', auth, async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author');
    res.json({ blogs, user: req.user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
});

// Create a new blog
router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const newBlog = new Blog({ title, content, author: req.user.id });
    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    res.status(400).json({ message: 'An error occurred', error: error.message });
  }
});

// Get a single blog by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error: error.message });
  }
});

// Update a blog
router.put('/:id', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to edit this blog' });
    }
    blog.title = title;
    blog.content = content;
    await blog.save();
    res.json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    res.status(400).json({ message: 'An error occurred' });
  }
});

// Delete a blog
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this blog' });
    }
    await blog.deleteOne();
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'An error occurred', error: error.message });
  }
});

module.exports = router;
