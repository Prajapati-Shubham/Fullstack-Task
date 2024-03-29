import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import User from "../models/user.js";
import jwt from "jsonwebtoken";

const secretKey=process.env.SECRET;

const userController = {
  register: async (req, res, next) => {
    try {
      let { name, DOB, username, password } = req.body;
      // console.log(req.body);
      const newUser = new User({
        name,
        DOB,
        username,
      });
      await newUser.setPassword(password);
      const user = await newUser.save();
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: 86400 });
        return res
          .status(200)
          .json({ message: "Registerd Succesfully", data: user,token });
      });
    } catch (err) {
      console.log("Error in registration: ", err);
      return res.status(400).json({ message: err.message });
    }
  },
  login: async (req, res) => {
    if (req.isAuthenticated()) {
      try {
        const loginUser = req.user;
        
        const user = await User.findOne({ _id: loginUser._id });
        const token = jwt.sign({ id: user._id }, secretKey, {
          expiresIn: 86400,
        });
        return res
          .status(200)
          .json({ message: "You are succesfully Logged In", data: user,token });
      } catch (err) {
        console.log(err.message);
        return res.status(400).json({ message: "Authentication Failed" });
      }
    }
  },
};

export default userController;
