const blog = require("../models/blogSchema");
const profile = require('../models/profileSchema');

exports.createBlog = async (req, res) => {
  try {
    const userId = req.payload;

    const blogPost = new blog({
      title: req.body.title,
      userId: userId,
      description: req.body.description,
      image: req.file.filename,
    });
    await blogPost.save();
    res.status(201).json("Blog created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const allBlogPosts = await blog.find();
    res.status(200).json(allBlogPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const userId = req.payload;
    const blogId = req.body?.id;
    if (!blogId) {
      return res.status(400).json("Blog id is required");
    }

    // Attempt to find the blog post and return 404 if not found
    const blogPost = await blog.findById(blogId);
    if (!blogPost) {
      return res.status(404).json("Blog not found");
    }

    // Check if the user is authorized to update the blog
    if (blogPost.userId.toString() !== userId.toString()) {
      return res.status(401).json("Unauthorized");
    }

    // Create an update object to accumulate changes
    const update = {};

    // Check for fields in the request body and add them to the update object
    if (req.body?.title) {
      update.title = req.body.title;
    }
    if (req.body?.description) {
      update.description = req.body.description;
    }
    if (req.file) {
      update.image = req.file.filename;
    }

    // Only save the blog post if there's something to update
    if (Object.keys(update).length > 0) {
      Object.assign(blogPost, update);
      await blogPost.save();
      return res.status(200).json("Blog updated successfully");
    }

    return res.status(400).json("No data to update");
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

exports.deleteBlog = async (req, res) => {
    try {
        const userId = req.payload;
        const blogId = req.body?.id;
        if (!blogId) {
            return res.status(400).json("Blog id is required");
        }
        const blogPost = await blog.findById(blogId);
        if (!blogPost) {
            return res.status(404).json("Blog not found");
        }
        if (blogPost.userId.toString() !== userId.toString()) {
            return res.status(401).json("Unauthorized");
        }
        await blog.findByIdAndDelete(blogId);
        res.status(200).json("Blog deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error");
    }
}

exports.likePost = async (req, res) => {
    try {
       const userId = req.payload;
       const blogId = req.params.id;
       const blogPost = await blog.findById(blogId);
       if (!blogPost) {
           return res.status(404).json("Blog not found");
       }
       const userProfile = await profile.findOne({userId: userId});
       if (!userProfile) {
           return res.status(404).json("Profile not found");
       }
       const likedBlogs = userProfile.favouriteItems;
       if (likedBlogs.includes(blogId)) {
           return res.status(400).json("Blog already liked");
       }
       likedBlogs.push(blogId);
       userProfile.favouriteItems = likedBlogs;
       await userProfile.save();
       res.status(200).json("Blog liked successfully");

    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error");
    }
}