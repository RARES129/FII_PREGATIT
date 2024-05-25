let express = require("express"),
  router = express.Router();

router.use("/register", require("../endpoints/register"));
router.use("/login", require("../endpoints/login"));
router.use("/logout", require("../endpoints/logout"));
router.use("/", require("../endpoints/readUsers"));
router.use("/delete-student/:id", require("../endpoints/deleteUser"));
router.use("/forgot-password/:id", require("../endpoints/forgotPassword"));
router.use("/reset-password/:id", require("../endpoints/resetPassword"));
router.use("/isLoggedIn", require("../endpoints/isLoggedIn"));
router.use("/create-exercise", require("../endpoints/createExercise"));
router.use("/exercises", require("../endpoints/readExercices"));
router.use("/exercise-text/", require("../endpoints/readSingleExercise"));
router.use("/exercise/", require("../endpoints/submitExercise"));

module.exports = router;
