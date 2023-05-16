const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config");

const createToken = (_id) => {
  return jwt.sign({ _id }, config.jwtSecret, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(401).json({ error: "All fields must be fill" });
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Incorrect email" });

  const isCorrectUser = await bcrypt.compare(password, user.hashPassword);
  const token = createToken(user._id);
  isCorrectUser
    ? res.status(200).json({ email, token })
    : res.status(401).json({ error: "Incorrect Password" });
};

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  //   console.log(req.body);

  //validation
  if (!email || !password) {
    return res.status(400).json({ error: "All fields must be fill" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Email is not valid" });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: "Password not strong enough" });
  }
  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ error: "Email already in use" });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    // console.log(typeof hashPassword);

    const user = await User.create({ email, hashPassword });

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { signupUser, loginUser };
