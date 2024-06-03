let express = require("express"),
  router = express.Router();

router.use("/register", require("../endpoints/register"));
router.use("/login", require("../endpoints/login"));
router.use("/logout", require("../endpoints/logout"));
router.use("/", require("../endpoints/readUsers"));
router.use("/delete-student/", require("../endpoints/deleteUser"));
router.use("/forgot-password", require("../endpoints/forgotPassword"));
router.use("/reset-password/:id", require("../endpoints/resetPassword"));
router.use("/isLoggedIn", require("../endpoints/isLoggedIn"));
router.use("/create-exercise", require("../endpoints/createExercise"));
router.use("/exercises", require("../endpoints/readExercices"));
router.use("/exercise-text/", require("../endpoints/readSingleExercise"));
router.use("/exercise/", require("../endpoints/submitExercise"));
router.use("/profile/user", require("../endpoints/readUser"));
router.use("/profile/success-rates", require("../endpoints/userSuccessRate"));
router.use("/isAdmin", require("../endpoints/isAdmin"));
router.use("/delete-exercise", require("../endpoints/deleteExercise"));

module.exports = router;
