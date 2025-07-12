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
