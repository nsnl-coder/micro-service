import { useState } from 'react';
import axios from 'axios';

const CommentCreate = ({ postId }) => {
  const [comment, setComment] = useState('');

  const createComment = async (e) => {
    e.preventDefault();
    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content: comment,
    });
    setComment('');
  };

  return (
    <form onSubmit={createComment}>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button> submit</button>
    </form>
  );
};

export default CommentCreate;
