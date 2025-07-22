const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files (your index.html, css, js)
app.use(express.static("public"));

// Mock Gemini-style location response (HTML format)
app.post("/location", async (req, res) => {
  const { location } = req.body;

  const htmlResponse = `
    <div class="stay-section category-section">
      <h2>Stay Options in ${location}</h2>
      <ul>
        <li><strong>High Budget:</strong> Grand Palace Hotel</li>
        <li><strong>Low Budget:</strong> Comfort Lodge</li>
        <li><strong>Low Budget:</strong> City Inn</li>
        <li><strong>Mid Budget:</strong> Blossom Residency</li>
      </ul>
    </div>

    <div class="food-section category-section">
      <h2>Food Options in ${location}</h2>
      <ul>
        <li><strong>Veg:</strong> GreenLeaf Veg Restaurant</li>
        <li><strong>Veg:</strong> Annapurna Bhojanalaya</li>
        <li><strong>Non-Veg:</strong> BBQ Hub</li>
        <li><strong>Non-Veg:</strong> Chicken Express</li>
      </ul>
    </div>

    <div class="visit-section category-section">
      <h2>Top 5 Places to Visit in ${location}</h2>
      <ol>
        <li>Central Park</li>
        <li>Historic Museum</li>
        <li>Riverfront Walk</li>
        <li>Botanical Garden</li>
        <li>Skyview Tower</li>
      </ol>
    </div>

    <div class="transport-section category-section">
      <h2>Transport Near ${location}</h2>
      <ul>
        <li>Bus Stand: Main Bus Terminal</li>
        <li>Auto Stand: Sector 14 Auto Point</li>
        <li>Railway Station: ${location} Central</li>
        <li>Airport: ${location} International Airport</li>
      </ul>
    </div>

    <div class="essentials-section category-section">
      <h2>Essentials in ${location}</h2>
      <ul>
        <li>ATM: HDFC ATM - Market Road</li>
        <li>Medical: CityCare Hospital</li>
        <li>Grocery: Smart Bazaar</li>
        <li>Emergency: Police Station Sector 4</li>
      </ul>
    </div>
  `;

  res.json({ reply: htmlResponse });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

