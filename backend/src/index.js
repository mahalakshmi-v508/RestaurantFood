const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});
