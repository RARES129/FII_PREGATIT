let express = require("express"),
  router = express.Router();
userSchema = require("../models/user.model");

router.get("/", async (req, res, next) => {
  try {
    const user = await userSchema.findOne({
      _id: req.session.userId,
    });
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json(user.admin);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
