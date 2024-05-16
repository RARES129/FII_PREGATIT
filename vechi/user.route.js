//backend/routes/student.route.js
require("dotenv").config();
let express = require("express"),
  router = express.Router();
bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

let userSchema = require("../models/user.model");

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

router.get("/isLoggedIn", (req, res) => {
  if (req.session && req.session.userId) {
    res.status(200).send(true);
  } else {
    res.send(false);
  }
});

// CREATE Student
router.post("/register", async (req, res, next) => {
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

router.post("/login", async (req, res, next) => {
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

// LOGOUT
router.post("/logout", (req, res) => {
  console.log(req.session.id);
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

router.post("/reset-password/:token", async (req, res, next) => {
  try {
    const user = await userSchema.findOne({
      resetToken: req.params.token,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).send("Invalid or expired reset token");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    console.log("Password has been reset");
    res.status(200).json("Password has been reset");
  } catch (error) {
    next(error);
  }
});

router.post("/forgot-password", async (req, res, next) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("User with this email does not exist");
    }

    // Generate a random reset token
    const resetToken = require("crypto").randomBytes(32).toString("hex");

    // Save the reset token and expiration time to the user's document in the database
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    // Send the reset email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\nhttp://${req.body.host}/reset-password/${resetToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log("There was an error: ", error);
      } else {
        console.log("Here is the response: ", response);
        res.status(200).json("Recovery email sent");
      }
    });
  } catch (error) {
    next(error);
  }
});

// router.get("/protected", isAuthenticated, (req, res) => {
//   // If execution reaches here, user is authenticated
//   res.send("You are logged in!");
//   console.log("User is logged in");
// });

module.exports = router;
