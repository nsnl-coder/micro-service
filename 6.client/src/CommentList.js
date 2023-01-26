import { useEffect, useState } from 'react';
import axios from 'axios';

const CommentList = ({ postId, comments }) => {
  return (
    <ul>
      {comments.map((comment) => {
        if (comment.status === 'approved') {
          return <li key={comment.id}>{comment.content}</li>;
        }
        if (comment.status === 'rejected') {
          return <li key={comment.id}>This comment has been rejected</li>;
        }
        if (comment.status == 'pending') {
          return <li key={comment.id}>This comment is pending</li>;
        }
      })}
    </ul>
  );
};

export default CommentList;
