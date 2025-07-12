import express from 'express';
import supabase from './supabaseClient.js'; // make sure this file exists

const app = express();
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('Backend is live!');
});

// Strategy (mock logic for now)
app.post('/strategy', (req, res) => {
  const { user_id, merchant, amount } = req.body;

  if (!user_id || !merchant || !amount) {
    return res.status(400).json({ error: 'Missing input fields' });
  }

  res.json({
    best_strategy: `Mock strategy: Use a card for ${merchant} and ₹${amount}`,
  });
});


// ✅ Admin API: Add user profile
app.post('/admin/add-user', async (req, res) => {
  const { user_id, reward_pref, spending_tags, platforms_used } = req.body;

  const { data, error } = await supabase.from('user_profile').insert([
    { user_id, reward_pref, spending_tags, platforms_used }
  ]);

  if (error) return res.status(500).json({ error });
  res.json({ message: 'User added successfully', data });
});

// ✅ Admin API: Add credit card to user
app.post('/admin/add-card', async (req, res) => {
  const { user_id, card_id, credit_limit, current_usage, bill_cycle } = req.body;

  const { data, error } = await supabase.from('user_credit_cards').insert([
    { user_id, card_id, credit_limit, current_usage, bill_cycle }
  ]);

  if (error) return res.status(500).json({ error });
  res.json({ message: 'Card added successfully', data });
});

// ✅ Admin API: Add voucher info
app.post('/admin/add-voucher', async (req, res) => {
  const { platform_name, merchant_name, voucher_value, voucher_cost, payment_modes, platform_fees } = req.body;

  const { data, error } = await supabase.from('voucher_platforms').insert([
    { platform_name, merchant_name, voucher_value, voucher_cost, payment_modes, platform_fees }
  ]);

  if (error) return res.status(500).json({ error });
  res.json({ message: 'Voucher added successfully', data });
});

// ✅ Admin API: Add merchant offer
app.post('/admin/add-offer', async (req, res) => {
  const { merchant_name, card_id, offer_type, discount_value, min_txn_amount, valid_till, platform } = req.body;

  const { data, error } = await supabase.from('merchant_offers').insert([
    { merchant_name, card_id, offer_type, discount_value, min_txn_amount, valid_till, platform }
  ]);

  if (error) return res.status(500).json({ error });
  res.json({ message: 'Offer added successfully', data });
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
