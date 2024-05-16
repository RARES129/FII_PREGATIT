let express = require("express"),
  router = express.Router();
bcrypt = require("bcryptjs");
userSchema = require("../models/user.model");

router.post("/", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const existingEmail = await userSchema.findOne({
      email: req.body.email,
    });
    if (existingEmail) {
      return res.status(400).send("A user with this email already exists");
    }

    const newUser = await userSchema.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    console.log("User created successfully !");
    res.json(newUser);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
