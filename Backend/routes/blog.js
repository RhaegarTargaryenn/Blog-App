const express = require("express");
const router = express.Router();
const { dummyLink, likePost, unlikePost } = require("../Controllers/LikeController");
const { createComment } = require("../Controllers/CommentController");
const { createPost, getAllPosts , getUserPostsById , updatePostById ,deletePostById} = require("../Controllers/PostController");
const { signUp, login } = require('../Controllers/signUpController');

// Unprotected routes
router.get("/dummyroute", dummyLink);
router.post("/comments/create", createComment);
router.get("/posts", getAllPosts);
router.get('/user/:userId/posts', getUserPostsById);
router.delete("/posts/:postId", deletePostById);
router.patch("/posts/:postId", updatePostById);


router.post("/posts/create",createPost);
router.post("/like",likePost);
router.post("/unlike",unlikePost);


router.post('/signup', signUp);
router.post('/login', login);

// Export the router
module.exports = router;
