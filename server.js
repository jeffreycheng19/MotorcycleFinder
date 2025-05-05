"use strict";

const express = require("express");
const multer = require("multer");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());

app.use('/', express.static('public'));

app.post("/recommend-bike", async (req, res) => {
  const { experience, type, min_power, max_weight, make } = req.body;
  const displacement = "";
  if (!experience) return res.status(400).json({ error: "Experience level is required" });
  if (!type) return res.status(400).json({ error: "Bike type is required" });

  const params = { type };
  if (min_power) params.min_power = min_power;
  if (max_weight) params.max_weight = max_weight;
  if (make) params.make = make;

  if(experience == "Beginner"){
    displacement = 250;
  }else if(experience == "Intermediate"){
    displacement = 650;
  }else{
    displacement = 950;
  }

  function makeRequest() {
    // API Documentation https://randomuser.me/documentation
    let url = BASE_URL + "/v1/motorcycles" + `?displacement=${displacement}`; // Customize this query string as needed
  
    fetch(url, {
      "X-Api_Key": "The api key that was given"
    })
      .then(statusCheck)
      .then(resp => resp.json()) // use .text() instead if the response is plain text
      .then(processReq)
      .catch(handleError); // You can define this to show a user-friendly message
  }

});



app.get("/api/compare", async (req, res) => {
  const { make } = req.query;
  if (!make) return res.status(400).json({ error: "Make query parameter is required" });


});

const BASE_URL = "https://api.api-ninjas.com"; // Use a single base URL for this example

function processReq(data) {
  displayBikes(data);
  console.log(data);
}

async function statusCheck(res) {
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res;
}

function handleError(err) {
  console.error("An error occurred:", err.message);
  alert("Something went wrong. Please try again later.");
  // or update a <div id="error"> element
}

function displayBikes(data) {

  if (!data?.transactions) {
      console.warn(
          "are you sure you are calling it after fetchFinanceData is finsihed ?"
      );
      throw new Error("data is not valid");
  }

  const bike = document.getElementById("bikes");
  const bikeTBod = document.getElementById("bikeData");


  data.transactions.forEach((item) => {
      const tableRow = document.createElement("tr");
      const make = document.createElement("td");
      const model = document.createElement("td");
      const type = document.createElement("td");
      const weight = document.createElement("td");
      const horsepower = document.createElement("td");

      make.textContent = item.make + " ";
      model.textContent = item.model + " ";
      type.textContent = item.type + " ";
      weight.textContent = item.total_weight + " ";
      horsepower.textContent = item.power + " ";

      tableRow.append(make);
      tableRow.append(model);
      tableRow.append(type);
      tableRow.append(weight);
      tableRow.append(horsepower);

      bikeTBod.append(tableRow);
      console.log(item);
      // Your code goes here!
      bike.append(bikeTBod)

  });
}


// app.get("/compare", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "comparison.html"));
// });

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
