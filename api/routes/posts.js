const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// create post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.query.us);
    if (post.username === req.body.username || user.isAdmin) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("you can update only your post !");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.query.us);
    // console.log(user + "user id ");
    // console.log(post + "post id");
    if (post.username === req.body.username || user.isAdmin) {
      try {
        await post.delete();
        res.status(200).json("post deleted successfully");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("you can delete only your post !");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all post
router.get("/", async (req, res) => {
  let posts;
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({ categories: { $in: [catName] } });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
