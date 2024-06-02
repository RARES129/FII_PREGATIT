let express = require("express"),
  router = express.Router();
const userSchema = require("../models/user.model");
const sourceSchema = require("../models/source.model");

router.delete("/:id", async (req, res, next) => {
  console.log("Deleting user with ID:", req.params.id);
  try {
    // Find and delete the user by ID
    const user = await userSchema.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Delete all sources associated with the user
    await sourceSchema.deleteMany({ userId: req.params.id });

    res
      .status(200)
      .json({ msg: "User and associated sources deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
