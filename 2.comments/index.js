const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const comments = {};

app.use(bodyParser.json());

app.get('/posts/:id/comments', (req, res, next) => {
  const id = req.params.id;
  res.send(comments[id] || []);
});

app.post('/posts/:id/comments', async (req, res, next) => {
  const commentId = randomBytes(4).toString('hex');
  const oldComments = comments[req.params.id] || [];
  const content = req.body.content;

  const newComment = {
    id: commentId,
    content,
    status: 'pending',
    postId: req.params.id,
  };

  oldComments.push(newComment);
  comments[req.params.id] = oldComments;

  try {
    await axios.post('http://event-bus-cluster-ip-service:4005/events', {
      type: 'commentCreated',
      data: newComment,
    });
  } catch (err) {}

  res.status(201).send(oldComments);
});

app.post('/events', async (req, res, next) => {
  const { type, data } = req.body;

  if (type === 'commentModerated') {
    const { postId, id, status, content } = data;
    const oldComments = comments[postId];

    const updatedComment = oldComments.find((comment) => {
      return comment.id === id;
    });

    updatedComment.status = status;

    try {
      await axios.post('http://event-bus-cluster-ip-service:4005/events', {
        type: 'commentUpdated',
        data: {
          id,
          postId,
          status,
          content,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  res.status(200).json({ message: 'success' });
});

app.listen(4001, () => {
  console.log('app running on port 4001');
});
