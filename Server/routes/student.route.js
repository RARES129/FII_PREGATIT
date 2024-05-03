//backend/routes/student.route.js
let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let studentSchema = require("../models/Student");

// CREATE Student
router.post("/create-student", (req, res, next) => {
  // Check if a user with the same email already exists
  studentSchema
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        // If a user with the same email already exists, send an error message
        res.status(400).send("A user with this email already exists");
      } else {
        // If no user with the same email exists, create a new user
        studentSchema
          .create(req.body)
          .then((data) => {
            console.log(data);
            res.json(data);
          })
          .catch((error) => {
            return next(error);
          });
      }
    })
    .catch((err) => {
      return next(err);
    });
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
