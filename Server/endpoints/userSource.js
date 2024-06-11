let express = require("express"),
  router = express.Router();
const exerciseSchema = require("../models/exercise.model");
const sourceSchema = require("../models/source.model");
const userSchema = require("../models/user.model");

router.get("/:id/:userId", async (req, res, next) => {
  try {
    const exercise = await exerciseSchema.findOne({
      id: req.params.id,
    });
    if (!exercise) {
      return res.status(404).send("404 NOT FOUND");
    }

    const userSource = await sourceSchema.findOne({
      exerciseId: req.params.id,
      userId: req.params.userId,
    });

    const user = await userSchema.findById(req.params.userId);

    const response = {
      exercise,
      language: userSource ? userSource.language : null,
      userFiles: userSource ? userSource.files : [],
      userScore: userSource ? userSource.score : null,
      name: user.name,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
