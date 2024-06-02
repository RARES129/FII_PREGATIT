let express = require("express"),
  router = express.Router();
exerciseSchema = require("../models/exercise.model");

router.post("/", async (req, res, next) => {
  try {
    const existingName = await exerciseSchema.findOne({
      name: req.body.problemName,
    });
    if (existingName) {
      return res.status(400).send("An exercise with this name already exists");
    }
    const testCases = req.body.testInputs.map((input, index) => ({
      input,
      output: req.body.testOutputs[index],
    }));
    const newExercise = await exerciseSchema.create({
      name: req.body.problemName,
      text: req.body.problemText,
      type: req.body.problemType,
      testCases,
    });

    console.log("Exercise created successfully !");
    res.json(newExercise);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
