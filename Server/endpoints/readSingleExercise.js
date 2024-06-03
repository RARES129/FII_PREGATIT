let express = require("express"),
  router = express.Router();
const exerciseSchema = require("../models/exercise.model");
const sourceSchema = require("../models/source.model");

router.get("/:id", async (req, res, next) => {
  try {

    const exercise = await exerciseSchema.findOne({
      id: req.params.id,
    });
    if (!exercise) {
      return res.status(404).send("404 NOT FOUND");
    }

    const userSource = await sourceSchema.findOne({
      exerciseId: req.params.id,
      userId: req.session.userId, 
    });


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
