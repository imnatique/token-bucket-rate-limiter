const express = require('express');
const rateLimit = require('./rateLimit');

const app = express();

// Tight bucket so it's easy to trigger 429s while testing manually
app.use('/api/ping', rateLimit({ maxTokens: 5, refillRate: 1 }));

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong', time: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.send('Token Bucket Rate Limiter - Phase 1 (in-memory)');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
