import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Reply {
  _id: string;
  text: string;
  author: string;
  upvotes: number;
}

interface Comment {
  _id: string;
  text: string;
  author: string;
  upvotes: number;
  replies: Reply[];
}


let newComments : Comment  ={ 
    _id : '1',
    text : "HElloehtere",
    author : "me",
    upvotes : 0,
    replies : []
}

interface CommentsSectionProps {
    projectId: string | undefined;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ projectId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [replyText, setReplyText] = useState<string>('');
  const [currentCommentId, setCurrentCommentId] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:5001/comments/${projectId}`)
      .then(response => setComments(response.data))
      .catch(error => console.error('Error fetching comments:', error));
  }, [projectId]);

  const handleAddComment = () => {
    axios.post('http://localhost:5001/comment/new', { author: 'User', text: newComment, projectId })
      .then(response => {
        setComments([...comments, response.data]);
        setNewComment('');
      })
      .catch(error => console.error('Error adding comment:', error));
  };

  const handleAddReply = (commentId: string) => {
    axios.post(`http://localhost:5001/comments/${commentId}/reply/new`, { author: 'User', text: replyText })
      .then(response => {
        setComments(comments.map(comment => comment._id === commentId ? response.data : comment));
        setReplyText('');
        setCurrentCommentId(null);
      })
      .catch(error => console.error('Error adding reply:', error));
  };

  const handleUpvote = (commentId: string, replyId?: string) => {
    axios.put(`http://localhost:5001/comments/${commentId}/upvote`, { replyId })
      .then(response => setComments(response.data))
      .catch(error => console.error('Error upvoting:', error));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-4">Comments</h3>
      <div className="mb-6">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button
          onClick={handleAddComment}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
      <div>
        {comments.map(comment => (
          <div key={comment._id} className="mb-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-800">{comment.author}</span>
              <button
                onClick={() => handleUpvote(comment._id)}
                className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Upvote ({comment.upvotes})
              </button>
            </div>
            <p className="text-gray-700 mb-2">{comment.text}</p>
            <div className="ml-4 border-l border-gray-200 pl-4">
              {comment.replies.map(reply => (
                <div key={reply._id} className="mb-3 p-3 bg-gray-50 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-600">{reply.author}</span>
                    <button
                      onClick={() => handleUpvote(comment._id, reply._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Upvote ({reply.upvotes})
                    </button>
                  </div>
                  <p className="text-gray-600">{reply.text}</p>
                </div>
              ))}
              {currentCommentId === comment._id && (
                <div className="mt-4">
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Add a reply..."
                  />
                  <button
                    onClick={() => handleAddReply(comment._id)}
                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Reply
                  </button>
                </div>
              )}
              <button
                onClick={() => setCurrentCommentId(comment._id)}
                className="mt-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
