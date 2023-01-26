const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/events', async (req, res, next) => {
  if (req.body.type === 'commentCreated') {
    const status = req.body.data.content.includes('orange')
      ? 'rejected'
      : 'approved';

    await axios.post('http://event-bus-cluster-ip-service:4005/events', {
      type: 'commentModerated',
      data: {
        ...req.body.data,
        status,
      },
    });
  }
  res.status(200).json({ message: 'success' });
});

app.listen(4003, () => {
  console.log('listening on port 4003');
});
