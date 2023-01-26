import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
  const [title, setTitle] = useState('');

  const submitHandle = async (e) => {
    e.preventDefault();

    await axios.post('http://posts.com/posts/create', { title });
    setTitle('');
  };

  return (
    <div>
      <form onSubmit={submitHandle}>
        <div className="form-group">
          <label htmlFor="">title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            type="text"
          />
        </div>
        <button className="btn btn-primary">submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
