let express = require("express"),
  router = express.Router();
bcrypt = require("bcryptjs");
userSchema = require("../models/user.model");

router.post("/", async (req, res, next) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    console.log("User found:", user);
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send("Invalid email or password");
    }

    if (!req.session.userId) {
      req.session.userId = user._id;
    }

    res.cookie("sessionId", req.session.id, { httpOnly: true });
    res.status(200).send("Logged in successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
