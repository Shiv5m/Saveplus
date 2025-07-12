import express from 'express';

const app = express();

// ✅ Required to parse JSON bodies
app.use(express.json());

// ✅ Basic test route
app.get('/', (req, res) => {
  res.send('Backend is live!');
});

// ✅ Strategy route mock
app.post('/strategy', (req, res) => {
  const { user_id, merchant, amount } = req.body;

  if (!user_id || !merchant || !amount) {
    return res.status(400).json({ error: 'Missing input fields' });
  }

  res.json({
    best_strategy: `Mock strategy: Use card X for ${merchant} and ₹${amount}`,
  });
});

// ✅ Use dynamic PORT for Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
