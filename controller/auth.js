import bcrypt from "bcryptjs";
import User from "../model/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.userName,
      email: req.body.email,
      password: hash,
    });
    newUser.save();
    res.status(200).json({
      message: "User Created SuccessFully",
      data: { name: newUser.username, email: newUser.email },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("body-->login", email, password);
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(404, "User Not found"));
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return next(createError(400, "Password does not match"));
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    res
      .cookie("acess_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        message: "User loggged in SuccessFully",
        data: { name: req.body.userName, email: req.body.email },
      });
  } catch (err) {
    next(err);
  }
};
