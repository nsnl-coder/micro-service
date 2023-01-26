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
    await axios.post('http://localhost:4000/events', event);
  } catch (err) {}

  try {
    await axios.post('http://localhost:4001/events', event);
  } catch (err) {}

  try {
    await axios.post('http://localhost:4002/events', event);
  } catch (err) {}
  try {
    await axios.post('http://localhost:4003/events', event);
  } catch (err) {}
});

app.get('/events', (req, res, next) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('app running on port 4005');
});
