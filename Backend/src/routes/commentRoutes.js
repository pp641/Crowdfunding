const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
router.post('/comment/new', commentController.createComment);
router.get('/comments/:projectId', commentController.getAllComments);
router.post('/comments/:id/reply/new', commentController.addReplyToComment);
router.put('/:id/upvote', commentController.upvoteCommentOrReply);

module.exports = router;
