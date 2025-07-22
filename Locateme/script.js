const API_KEY = "AIzaSyCRh8j-N32U2kOAz8XXNgqTziRBPUzjPkk"; // 🔁 Replace with your real Gemini API key

async function fetchLocationDetails(location) {
  const prompt = `
You are a travel assistant. Based on the location "${location}", provide:

1. 5 Famous Tourist Spots (with short description)
2. 4 Stay Options (1 High Budget Hotel, 2 Budget Hotels, 1 Hostel)
3. 4 Food Options (2 Veg, 2 Non-Veg with type or specialty)
4. 5 Essentials (ATM, Medical, Grocery, Emergency Service, Safety Info)
5. 4 Transport Options (Nearby Railway Station, Bus Stop, Auto Stand, Airport)

Respond in this format:
{
  "visit": [...],
  "stay": [...],
  "food": [...],
  "essentials": [...],
  "transport": [...]
}`;

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const jsonStart = textResponse.indexOf('{');
    const jsonEnd = textResponse.lastIndexOf('}') + 1;
    const jsonString = textResponse.substring(jsonStart, jsonEnd);
    const result = JSON.parse(jsonString);

    updateUI(result);
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to fetch data. Please try again.");
  }
}

function updateUI(data) {
  const categories = ["visit", "stay", "food", "essentials", "transport"];
  categories.forEach(category => {
    const box = document.getElementById(`${category}Details`);
    box.innerHTML = "";
    if (data[category]) {
      data[category].forEach(item => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `<h4>${item.name || item}</h4><p>${item.description || ''}</p>`;
        box.appendChild(div);
      });
    }
  });
  document.getElementById("detailsSection").scrollIntoView({ behavior: "smooth" });
}

window.showCards = function () {
  const location = document.getElementById("locationInput").value.trim();
  if (!location) {
    alert("Please enter a location!");
    return;
  }

  fetchLocationDetails(location);
};
import { fetchLocationDetails } from './gemini.js';

document.getElementById('searchForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const location = document.getElementById('locationInput').value.trim();

  if (location === "") return;

  document.getElementById('results').innerText = "Fetching data..."; // loading message

  try {
    const data = await fetchLocationDetails(location);
    console.log("Gemini response:", data);

    // Inject data to UI
    document.getElementById('results').innerText = data;

    // Optional: parse and assign category-wise if data is JSON or separated by tags

  } catch (error) {
    console.error("Error fetching Gemini data:", error);
    document.getElementById('results').innerText = "Failed to fetch location info. Please try again.";
  }
});  

