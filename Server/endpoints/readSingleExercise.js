let express = require("express"),
  router = express.Router();
const exerciseSchema = require("../models/exercise.model");
const sourceSchema = require("../models/source.model");

router.get("/:id", async (req, res, next) => {
  try {
    // Find the exercise by ID
    const exercise = await exerciseSchema.findOne({
      id: req.params.id,
    });
    if (!exercise) {
      return res.status(404).send("404 NOT FOUND");
    }

    // Find the user's source code and score for the exercise
    const userSource = await sourceSchema.findOne({
      exerciseId: req.params.id,
      userId: req.session.userId, // Assuming the user ID is stored in the session
    });

    // Construct the response
    const response = {
      exercise,
      userCode: userSource ? userSource.code : null,
      userScore: userSource ? userSource.score : null,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
