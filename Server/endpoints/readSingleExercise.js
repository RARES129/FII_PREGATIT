let express = require("express"),
  router = express.Router();
exerciseSchema = require("../models/exercise.model");

router.get("/:id", async (req, res, next) => {
  try {
    const exercise = await exerciseSchema.findOne({
      id: req.params.id,
    });
    if (!exercise) {
      return res.status(404).send("404 NOT FOUND");
    }

    res.json(exercise);
    return res.status(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
