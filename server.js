
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// TEST ROUTE ← add this!
app.get('/test', (req, res) => {
  res.json({ message: '✅ Server is working!' });
});

app.use('/auth', require('./my-backend/routes/auth'));
app.use('/tools', require('./my-backend/routes/tools'));
app.use('/reservations', require('./my-backend/routes/reservations'));

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// For Vercel
module.exports = app;