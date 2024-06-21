let express = require("express"),
  router = express.Router();
bcrypt = require("bcryptjs");
userSchema = require("../models/user.model");

router.post("/:token", async (req, res, next) => {
  try {
    const user = await userSchema.findOne({
      resetToken: req.params.token,
      resetTokenExpiration: { $gt: Date.now() },
    });
    console.log(req.params.token, user);
    if (!user) {
      return res.status(400).send("Invalid or expired reset token");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await user.save();

    console.log("Password has been reset");
    res.status(200).json("Password has been reset");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
