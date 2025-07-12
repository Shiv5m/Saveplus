const express = require('express');
const supabase = require('./supabaseClient');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('Backend is live!'));

app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('user_profile')
    .select('*')
    .eq('user_id', id)
    .single();

  if (error) return res.status(500).json({ error });
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

/*app.post('/strategy', async (req, res) => {
  const { user_id, merchant, amount } = req.body;

  if (!user_id || !merchant || !amount) {
    return res.status(400).json({ error: "Missing user_id, merchant, or amount" });
  }

  try {
    // 1. Fetch user's cards
    const { data: cards } = await supabase
      .from('user_credit_cards')
      .select('card_id')
      .eq('user_id', user_id);

    // 2. Check for merchant offers
    const { data: offers } = await supabase
      .from('merchant_offers')
      .select('*')
      .eq('merchant_name', merchant)
      .lte('min_txn_amount', amount);

    // 3. Find applicable offers
    const matchingOffers = offers?.filter(o => cards.find(c => c.card_id === o.card_id)) || [];

    // 4. Get base rewards for user cards
    const cardIds = cards.map(c => c.card_id);
    const { data: rewards } = await supabase
      .from('card_rewards')
      .select('*')
      .in('card_id', cardIds)
      .eq('category', 'online'); // default to 'online' for now

    // 5. Check voucher platforms
    const { data: vouchers } = await supabase
      .from('voucher_platforms')
      .select('*')
      .eq('merchant_name', merchant);

    const bestVoucher = vouchers?.[0];
    const voucherSavings = bestVoucher ? bestVoucher.voucher_value - bestVoucher.voucher_cost : 0;

    // 6. Choose best option
    const bestOffer = matchingOffers?.[0];
    const bestReward = rewards?.sort((a, b) => b.reward_rate - a.reward_rate)?.[0];

    let bestStrategy = '';
    if (voucherSavings > 0 && bestVoucher) {
      bestStrategy = `Buy ₹${bestVoucher.voucher_value} voucher for ₹${bestVoucher.voucher_cost} using ${bestVoucher.payment_modes?.[0]}`;
    } else if (bestOffer) {
      bestStrategy = `Use ${bestOffer.card_id} for ${bestOffer.discount_value}% ${bestOffer.offer_type}`;
    } else if (bestReward) {
      bestStrategy = `Use ${bestReward.card_id} for ${bestReward.reward_rate}% ${bestReward.reward_type}`;
    } else {
      bestStrategy = 'No specific strategy found — use any card with base rewards.';
    }

    return res.json({
      best_strategy: bestStrategy,
      details: {
        voucher_available: !!bestVoucher,
        voucher_savings: voucherSavings,
        card_offer: bestOffer || null,
        base_reward: bestReward?.reward_rate || 0
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Strategy computation failed" });
  }
});*/
app.use(express.json());

app.post('/strategy', (req, res) => {
  const { user_id, merchant, amount } = req.body;
  if (!user_id || !merchant || !amount) {
    return res.status(400).json({ error: 'Missing input' });
  }

  res.json({
    best_strategy: `Mock response for ${merchant} and amount ₹${amount}`,
  });
});
