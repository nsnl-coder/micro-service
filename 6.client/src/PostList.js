import { useEffect, useState } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    (async () => {
      const res = await axios.get('http://posts.com/posts');
      setPosts(res.data);
    })();
  }, []);

  const renderPosts = Object.values(posts);

  return (
    <div className="d-flex flex-row flex-wrap justify-content-center">
      {renderPosts.map((post) => (
        <div
          className="card w-50"
          style={{ width: '30%', marginBottom: '20px' }}
          key={post.id}
        >
          <div className="card-body">
            <h3>{post.title}</h3>
            <hr />
            <CommentCreate postId={post.id} />
            <hr />
            <CommentList postId={post.id} comments={post.comments} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
