import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';

const App = () => {
  return (
    <div className="container">
      <h1>Creat long</h1>
      <PostCreate />
      <hr />
      <PostList />
    </div>
  );
};

export default App;
