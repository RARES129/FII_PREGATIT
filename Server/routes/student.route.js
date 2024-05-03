//backend/routes/student.route.js
let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
bcrypt = require("bcryptjs");

// Student Model
let studentSchema = require("../models/Student");

// CREATE Student
router.post("/create-student", async (req, res, next) => {
  try {
    // Hash and salt the password before saving to the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password with salt rounds = 10

    // Check if a user with the same email already exists
    const existingUser = await studentSchema.findOne({ email: req.body.email });
    if (existingUser) {
      // If a user with the same email already exists, send an error message
      return res.status(400).send("A user with this email already exists");
    }

    // If no user with the same email exists, create a new user
    const newUser = await studentSchema.create({
      email: req.body.email,
      password: hashedPassword, // Save the hashed password to the database
      // Include other fields as needed
    });

    console.log("User created successfully !");
    res.json(newUser);
  } catch (error) {
    return next(error);
  }
});

// READ Students
router.get("/", (req, res, next) => {
  studentSchema
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      return next(error);
    });
});

// Get Single Student
router.get("/update-student/:id", (req, res, next) => {
  studentSchema
    .findById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      return next(error);
    });
});

// Update Student Data
router.put("/update-student/:id", (req, res, next) => {
  studentSchema
    .findByIdAndUpdate(req.params.id, { $set: req.body, $inc: { __v: 1 } })
    .then((data) => {
      res.json(data);
      console.log("Student updated successfully !");
    })
    .catch((error) => {
      return next(error);
    });
});

// Delete Student
router.delete("/delete-student/:id", (req, res, next) => {
  studentSchema
    .findByIdAndDelete(req.params.id)
    .then((data) => {
      res.status(200).json({ msg: data });
    })
    .catch((error) => {
      return next(error);
    });
});

module.exports = router;
