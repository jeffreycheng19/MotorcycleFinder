require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/recommend-bike', async (req, res) => {
    console.log('🔔 POST /recommend-bike body:', req.body);
  
    try {
      const response = await axios.get('https://api.api-ninjas.com/v1/motorcycles', {
        headers: { 'X-Api-Key': process.env.API_KEY },
        params: { make: req.body.make, model: req.body.model, year: req.body.year }
      });
      res.json(response.data);
    } catch (error) {
      if (error.response) {
        console.error('💥 API error status:', error.response.status);
        console.error('💥 API error data:', error.response.data);
        return res.status(error.response.status).json({ error: error.response.data });
      }
      console.error('❌ Network or code error:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
