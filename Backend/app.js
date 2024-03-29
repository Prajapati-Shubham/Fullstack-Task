import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import localStrategy from "passport-local";
import session from "express-session";
import ExpressError from "./utils/expressError.js";
import userRoute from "./routes/userRoute.js";
import User from "./models/user.js";
const MONGO_URL =process.env.MONGO_URL;

main()
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Error in connection to database: ", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

//Express sesssion
const sessionOptions = {
  secret: "mySuperSceretCode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 2 * 24 * 60 * 60 * 1000,
    maxAge: 2 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
//Midddlwewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.unsubscribe(bodyParser.json());

//initailizing passport before using it
app.use(passport.initialize());

//user of Local strategy
passport.use("local", new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//API FOR REGISTRATION
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hii i am root");
});

app.use("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
});

app.use((err,req,res,next)=>{
    let {statusCode=500, message="Something went wrong"}=err;
    res.status(statusCode).json({message:message});
},
//Logging the error
(err,req,res,next)=>{
  console.log(err);
  next();
});

app.listen(8080, () => {
  console.log("App is runnning on port 8080");
});
