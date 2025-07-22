import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// Replace with your Gemini API key
const genAI = new GoogleGenerativeAI("AIzaSyCRh8j-N32U2kOAz8XXNgqTziRBPUzjPkk");

export async function fetchLocationDetails(location) {
  const prompt =  `

You are a travel assistant AI.
For location: "${location}", provide the following in clean HTML format with proper sections:

<div class="visit-section">
  <h3>Top 5 Tourist Places</h3>
  <ul>
    <li><b>Place Name:</b> short description</li>
    ...
  </ul>
</div>

<div class="stay-section">
  <h3>Stay Options</h3>
  <ul>
    <li><b>Luxury:</b> Hotel Name</li>
    ...
  </ul>
</div>

<div class="food-section">
  <h3>Food Options</h3>
  <ul>
    <li><b>Veg:</b> Dish or Restaurant</li>
    ...
  </ul>
</div>

<div class="essentials-section">
  <h3>Essentials</h3>
  <ul>
    <li>ATM, Grocery, Medical, Emergency</li>
  </ul>
</div>

<div class="transport-section">
  <h3>Transport</h3>
  <ul>
    <li>Airport, Metro, Bus Stand, Railway</li>
  </ul>
</div>
Only output the final HTML.`;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text(); // clean HTML
}
`;

  

// This function will be used on frontend to call the backend API
function fetchData() {
  const location = document.getElementById("locationInput").value;
  const prompt = " Give  tourist, food, stay, transport info for ${location}";

  fetch("http://localhost:5000/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  })
  .then(res => res.json())
  .then(data => {
    const output = data.candidates?.[0]?.content?.parts?.[0]?.text || "No result.";
    document.querySelector(".details-box").innerHTML = output;
  })
  .catch(err => {
    console.error(err);
    document.querySelector(".details-box").innerText = "Error fetching data.";
  });
};     
