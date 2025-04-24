"use strict";

const express = require("express");
const multer = require("multer");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());

app.use(express.static(path.join(__dirname, "public")));

app.post("/recommend-bike", async (req, res) => {
  const { experience, type, min_power, max_weight, make } = req.body;

  if (!experience) return res.status(400).json({ error: "Experience level is required" });
  if (!type)       return res.status(400).json({ error: "Bike type is required" });

  const params = { type };
  if (min_power)  params.min_power  = min_power;
  if (max_weight) params.max_weight = max_weight;
  if (make)       params.make       = make;

  try {
    const apiRes = await axios.get(
      "https://api.api-ninjas.com/v1/motorcycles",
      {
        headers: { "X-Api-Key": process.env.API_KEY },
        params
      }
    );
    res.json(apiRes.data);
  } catch (err) {
    console.error("API error:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({ error: err.response?.data || 'Failed to fetch motorcycles' });
  }
});

app.get("/api/compare", async (req, res) => {
  const { make } = req.query;
  if (!make) return res.status(400).json({ error: "Make query parameter is required" });
  try {
    const apiRes = await axios.get(
      "7847|sawfOf3RvdyHmP8MmmkBoazbbpQKLcWioeCmUebj",
      {
        headers: { "X-Api-Key": process.env.API_KEY },
        params: { make }
      }
    );
    res.json(apiRes.data);
  } catch (err) {
    console.error("API error:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({ error: err.response?.data || 'Failed to fetch motorcycles' });
  }
});

app.get("/compare", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "comparison.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
