let express = require("express"),
  router = express.Router();
exerciseSchema = require("../models/exercise.model");

router.post("/", async (req, res, next) => {
  if (req.session && req.session.userId) {
    try {
      const existingName = await exerciseSchema.findOne({
        name: req.body.problemName,
      });
      if (existingName) {
        return res
          .status(400)
          .send("An exercise with this name already exists");
      }
      const testCases = req.body.testInputs.map((input, index) => ({
        input,
        output: req.body.testOutputs[index],
      }));
      const newExercise = await exerciseSchema.create({
        name: req.body.problemName,
        text: req.body.problemText,
        type: req.body.problemType,
        language: req.body.language,
        testCases,
      });

      console.log("Exercise created successfully !");
      res.json(newExercise);
    } catch (error) {
      return next(error);
    }
  } else {
    res.status(401).json("Unauthorized !!!");
  }
});

module.exports = router;
