import userController from "../controller/userController.js";
import { Router } from "express";
const router = Router();
import passport from "passport";
import wrapAsync from "../utils/wrapAsync.js";
import verifyToken from "../middlewares.js";

//Registration Route
router.post("/register", wrapAsync(userController.register));

//Login Route
router.post(
  "/login",
  passport.authenticate("local"),
  wrapAsync(userController.login)
);

//dashboard Route
router.get("/dashboard",verifyToken,(req,res)=>{
  res.status(200).json({message:"Welcome to Dashboard"})
});

export default router;
