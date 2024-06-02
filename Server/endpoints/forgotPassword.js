require("dotenv").config();
let express = require("express"),
  router = express.Router();
const nodemailer = require("nodemailer");
userSchema = require("../models/user.model");

router.post("/", async (req, res, next) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    console.log("User: ", user);
    if (!user) {
      return res.status(404).send("User with this email does not exist");
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

module.exports = router;
