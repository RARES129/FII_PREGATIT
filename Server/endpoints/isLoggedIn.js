let express = require("express"),
  router = express.Router();
use = require("../models/user.model");

router.get("/", (req, res) => {
  if (req.session && req.session.userId) {
    res.status(200).send(true);
  } else {
    res.send(false);
  }
});

module.exports = router;
