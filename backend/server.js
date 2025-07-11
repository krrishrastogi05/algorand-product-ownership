// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// const buyRoute = require('./routes/buy');
// const returnRoute = require('./routes/return');
const statusRoute = require('./routes/status');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// app.use('/api/buy', buyRoute);
// app.use('/api/return', returnRoute);
app.use('/api/status', statusRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
