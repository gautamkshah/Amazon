const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose
  .connect("mongodb+srv://gautam2002gkp:gautam@cluster0.1dbqufv.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Error in connecting to database", err);
  });

// endpoint to register
const User = require("./models/user");
const Order = require("./models/order");

// function to send verification email
const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gautam2002gkp@gmail.com",
      pass: "nrundegatgpequwp",
    },
  });

  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "Email Verification",
    text: `Click on the link to verify your email: http://localhost:8000/verify/${verificationToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

app.post("/register", async (req, res) => {
  console.log("register endpoint called");
  res.status(200).send('User registered successfully');
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = new User({
      name,
      email,
      password,
    });
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // save user to database
    await newUser.save();

    // send verification email
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (err) {
    console.log("error in registering", err);
    res.status(500).json({ message: "Registration Faild" });
  }
});

// endpoint to verify email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    // find the user with the verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({ message: "Email Verified" });
  } catch (err) {
    console.log("error in verifying email", err);
    res.status(500).json({ message: "Verification Failed" });
  }
});

const secretKey = generateSecretkey();
function generateSecretkey() {
  return crypto.randomBytes(20).toString("hex");
}
// endpoint to login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user= await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // generate JWT token
    const token = jwt.sign({userId: user._id},secretKey)
    res.status(200).json({ message: "Login Successful", token });

  } catch (err) {
    console.log("error in login", err);
    res.status(500).json({ message: "Login Failed" });
  }
});


//endpoint to store a new address to the backend
app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;

    //find the user by the Userid
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //add the new address to the user's addresses array
    user.addresses.push(address);

    //save the updated user in te backend
    await user.save();

    res.status(200).json({ message: "Address created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error addding address" });
  }
});

//endpoint to get all the addresses of a particular user
app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieveing the addresses" });
  }
});
