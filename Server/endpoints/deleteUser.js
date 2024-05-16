let express = require("express"),
  router = express.Router();
userSchema = require("../models/user.model");

router.delete("/", (req, res, next) => {
  userSchema
    .findByIdAndDelete(req.params.id)
    .then((data) => {
      res.status(200).json({ msg: data });
    })
    .catch((error) => {
      return next(error);
    });
});

module.exports = router;
