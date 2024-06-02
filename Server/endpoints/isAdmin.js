let express = require("express"),
  router = express.Router();
userSchema = require("../models/user.model");

router.get("/", async (req, res, next) => {
  try {
    const user = await userSchema.findOne({
      _id: req.session.userId,
    });
    if (!user) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }

    console.log("User: ", user.admin);
    res.json(user.admin);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
