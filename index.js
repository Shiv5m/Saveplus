import express from 'express';

const app = express();

// ✅ This must come before any routes
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is live!');
});

app.post('/strategy', (req, res) => {
  const { user_id, merchant, amount } = req.body;

  if (!user_id || !merchant || !amount) {
    return res.status(400).json({ error: 'Missing input' });
  }

  res.json({
    best_strategy: `Mock strategy for ${merchant}, amount ₹${amount}`,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
