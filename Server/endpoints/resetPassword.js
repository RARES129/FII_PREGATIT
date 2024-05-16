let express = require("express"),
  router = express.Router();
bcrypt = require("bcryptjs");
userSchema = require("../models/user.model");

router.post("/", async (req, res, next) => {
  try {
    const user = await userSchema.findOne({
      resetToken: req.params.token,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).send("Invalid or expired reset token");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    console.log("Password has been reset");
    res.status(200).json("Password has been reset");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
