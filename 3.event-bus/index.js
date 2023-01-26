const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const events = [];

app.use(bodyParser());

app.post('/events', async (req, res, next) => {
  const event = req.body;
  events.push(event);

  try {
    await axios.post('http://posts-cluster-ip-service:4000/events', event);
  } catch (err) {}

  try {
    await axios.post('http://comments-cluster-ip-service:4001/events', event);
  } catch (err) {}

  try {
    await axios.post('http://query-cluster-ip-service:4002/events', event);
  } catch (err) {}
  try {
    await axios.post('http://moderation-cluster-ip-service:4003/events', event);
  } catch (err) {}

  res.status(200).json('success');
});

app.get('/events', (req, res, next) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('app running on port 4005');
});
