const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(bodyParser());

const posts = {};

function handleEvent(type, data) {
  if (type == 'postCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type == 'commentCreated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type == 'commentUpdated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id == id);

    comment.status = status;
    comment.content = content;
  }
}

app.get('/posts', (req, res, next) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.status(200).json({ message: 'success' });
});

app.listen(4002, async () => {
  console.log('app running on port 4002');

  const res = await axios.get('http://localhost:4005/events');

  for (let event of res.data) {
    console.log('processing event', event.type);
    handleEvent(event.type, event.data);
  }
});
