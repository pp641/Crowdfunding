const Comment = require('../models/commentModel');

exports.createComment = async (req, res) => {
  try {
    console.log("okdo", req.params , req.body)
    const newComment = new Comment({
      project : req.body.projectId,
      author: req.body.author,
      text: req.body.text,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Error creating comment', error });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    console.log("params", req.params)
    const comments = await Comment.find({project : req.params.projectId});
    console.log("comments here" , comments)
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};

exports.addReplyToComment = async (req, res) => {
  try {
    console.log("here called")
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    comment.replies.push({
      author: req.body.author,
      text: req.body.text,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({ message: 'Error adding reply', error });
  }
};

exports.upvoteCommentOrReply = async (req, res) => {
  try {
    const { replyId } = req.body;
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (replyId) {
      const reply = comment.replies.id(replyId);
      if (reply) {
        reply.upvotes += 1;
        await comment.save();
        return res.status(200).json(comment);
      }
      return res.status(404).json({ message: 'Reply not found' });
    } else {
      comment.upvotes += 1;
      await comment.save();
      res.status(200).json(comment);
    }
  } catch (error) {
    console.error('Error upvoting:', error);
    res.status(500).json({ message: 'Error upvoting', error });
  }
};
