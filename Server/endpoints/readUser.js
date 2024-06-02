let express = require("express"),
  router = express.Router();
userSchema = require("../models/user.model");

router.get("/", (req, res, next) => {
  //   studentSchema;
  userSchema.findById(req.session.userId).then((data) => {
    console.log(data);
    res.json(data);
  });
});

module.exports = router;
