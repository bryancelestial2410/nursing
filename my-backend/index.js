const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ── MIDDLEWARE ─────────────────────────────────────────────
// ✅ Allow both local and production
app.use(cors({
  origin: ['http://localhost:3000', 'https://nursing-eta.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ── ROUTES ─────────────────────────────────────────────────
app.use('/auth',         require('./routes/auth'));
app.use('/reservations', require('./routes/reservations'));
app.use('/tools',        require('./routes/tools'));

// ── HEALTH CHECK ───────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: '✅ NCF CHS-CSR Backend is running!' });
});

// ── START SERVER ───────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;