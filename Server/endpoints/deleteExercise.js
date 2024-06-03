let express = require("express"),
  router = express.Router();
const Exercise = require("../models/exercise.model");
const Source = require("../models/source.model");

router.delete("/:id", async (req, res, next) => {
  if (req.session && req.session.userId) {
    try {
      const exercise = await Exercise.findOneAndDelete({ id: req.params.id });
      if (!exercise) {
        return res.status(404).json({ msg: "Exercise not found" });
      }
      
      await Source.deleteMany({ exerciseId: req.params.id });

      res
        .status(200)
        .json({ msg: "Exercise and associated sources deleted successfully" });
    } catch (error) {
      next(error);
    }
  } else {
    res.status(401).json("Unauthorized !!!");
  }
});

module.exports = router;
