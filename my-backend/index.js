const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ── MIDDLEWARE ─────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:3000', 'https://nursing-eta.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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