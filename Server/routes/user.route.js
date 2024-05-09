//backend/routes/student.route.js
let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
bcrypt = require("bcryptjs");

// Student Model
let userSchema = require("../models/User");

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    // User is authenticated, proceed to next middleware
    next();
  } else {
    // User is not authenticated, send 401 Unauthorized
    res.status(401).send("Unauthorized");
  }
};

router.get("/isLoggedIn", (req, res) => {
  if (req.session && req.session.userId) {
    res.status(200).send(true);
    // console.log("User is logged in");
  } else {
    res.send(false);
    // console.log("User is not logged in");
  }
});

// CREATE Student
router.post("/register", async (req, res, next) => {
  try {
    // Hash and salt the password before saving to the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password with salt rounds = 10

    // Check if a user with the same email already exists
    const existingEmail = await userSchema.findOne({
      email: req.body.email,
    });
    if (existingEmail) {
      // If a user with the same email already exists, send an error message
      return res.status(400).send("A user with this email already exists");
    }

    // If no user with the same email exists, create a new user
    const newUser = await userSchema.create({
      name: req.body.name,
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

router.post("/login", async (req, res, next) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    console.log("User found:", user); // Log user object
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send("Invalid email or password");
    }

    // Store user ID in session upon successful login
    if (!req.session.userId) {
      req.session.userId = user._id;
    }
    // Trimite cookie-ul de sesiune înapoi către client
    res.cookie("sessionId", req.session.id, { httpOnly: true }); // Acesta este un exemplu, asigură-te că ajustezi opțiunile cookie-ului după nevoile tale

    // Trimite răspunsul către client
    res.status(200).send("Logged in successfully");
  } catch (error) {
    next(error);
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  // Remove userId from session
  console.log(req.session.id);
  delete req.session.userId;

  req.session.destroy((err) => {
    if (err) {
      console.error("Error while logging out:", err);
      return res.status(500).send("Error while logging out");
    }

    // Session destroyed successfully

    res.clearCookie("sessionId");
    res.clearCookie("connect.sid");

    res.status(200).send("Logged out successfully");
    console.log("User logged out successfully");
  });
});

// READ Students
router.get("/", (req, res, next) => {
  userSchema
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
  userSchema
    .findById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      return next(error);
    });
});

// Delete Student
router.delete("/delete-student/:id", (req, res, next) => {
  userSchema
    .findByIdAndDelete(req.params.id)
    .then((data) => {
      res.status(200).json({ msg: data });
    })
    .catch((error) => {
      return next(error);
    });
});

// router.get("/protected", isAuthenticated, (req, res) => {
//   // If execution reaches here, user is authenticated
//   res.send("You are logged in!");
//   console.log("User is logged in");
// });

module.exports = router;
