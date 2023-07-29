const Post = require("../models/postModel");



exports.createPost = async (req, res) => {
  try {
    const { title, body} = req.body;

    const post = new Post({
      title,
      body,
    });

    const savedPost = await post.save();

    res.json({
      post: savedPost,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Error while creating post",
    });
  }
};


  exports.getAllPosts = async (req, res) => {
    try {
      const { userId } = req.params;
      const posts = await Post.find({ user: userId }).populate('likes').populate('comments').exec();
      res.json({
        posts,
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Error while fetching posts',
      });
    }
  };
  

  exports.getUserPostsById = async (req, res) => {
    try {
      const { userId } = req.params;
      const posts = await Post.find({ user: userId }).populate('user', '_id name');
      res.json({ posts });
    } catch (error) {
      return res.status(400).json({ error: 'Error while fetching user posts' });
    }
  };


  exports.deletePostById = async (req, res) => {
    try {
      const { postId } = req.params;
      await Post.findByIdAndDelete(postId);
      res.json({
        message: 'Post deleted successfully',
      });
    } catch (error) {
      return res.status(400).json({ error: 'Error while deleting post' });
    }
  };
  

  exports.updatePostById = async (req, res) => {
    try {
      const { postId } = req.params;
      const { title, body } = req.body;
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, body },
        { new: true } // Return the updated post
      );
  
      res.json({
        post: updatedPost,
      });
    } catch (error) {
      return res.status(400).json({ error: 'Error while updating post' });
    }
  };