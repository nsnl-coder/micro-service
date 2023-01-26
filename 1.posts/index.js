const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const posts = {};
const axios = require('axios');

app.use(cors());

app.use(bodyParser.json());

app.get('/posts', (req, res, next) => {
  res.send(posts);
});

app.post('/posts/create', async (req, res, next) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };
  try {
    await axios.post('http://event-bus-cluster-ip-service:4005/events', {
      type: 'postCreated',
      data: { id, title },
    });
  } catch (err) {}

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res, next) => {
  console.log('receive event', req.body.type);
  res.status(200).json({ message: 'success' });
});

app.listen(4000, () => {
  console.log('jajajaj');
  console.log('listening on port 4000');
});
