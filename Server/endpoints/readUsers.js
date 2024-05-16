let express = require("express"),
  router = express.Router();
userSchema = require("../models/user.model");

router.get("/", (req, res, next) => {
  userSchema
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      return next(error);
    });
});

module.exports = router;
