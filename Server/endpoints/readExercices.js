let express = require("express"),
  router = express.Router();
exerciseSchema = require("../models/exercise.model");

router.get("/", (req, res, next) => {
  exerciseSchema
    .find()
    .then((data) => {

      res.json(data);
    })
    .catch((error) => {
      return next(error);
    });
});

module.exports = router;
