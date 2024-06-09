const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());

app.get('/matches', async (req, res) => {
  try {
    const response = await axios.get('https://api.football-data.org/v4/competitions', {
      headers: { "X-Auth-Token": "1a93aed1ad8b40d1af324616d76267c1" }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
