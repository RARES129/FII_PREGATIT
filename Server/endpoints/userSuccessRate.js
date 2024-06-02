const express = require("express");
const router = express.Router();
const Source = require("../models/source.model");

router.get("/", async (req, res) => {
  try {
    const sources = await Source.find({ userId: req.session.userId });

    const successRates = {};
    sources.forEach((source) => {
      if (!successRates[source.type]) {
        successRates[source.type] = 0;
      }
      if (source.score == 100) {
        successRates[source.type]++;
      }
    });

    Object.keys(successRates).forEach((type) => {
      const totalAttempts = sources.filter(
        (source) => source.type === type
      ).length;
      successRates[type] = Math.round(
        (successRates[type] / totalAttempts) * 100
      );
    });

    res.json(successRates);
  } catch (error) {
    console.error("Error fetching success rates:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
