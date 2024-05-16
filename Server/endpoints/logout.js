let express = require("express"),
  router = express.Router();
userSchema = require("../models/user.model");

router.post("/", (req, res) => {
  delete req.session.userId;

  req.session.destroy((err) => {
    if (err) {
      console.error("Error while logging out:", err);
      return res.status(500).send("Error while logging out");
    }

    res.clearCookie("sessionId");
    res.clearCookie("connect.sid");

    res.status(200).send("Logged out successfully");
    console.log("User logged out successfully");
  });
});

module.exports = router;
