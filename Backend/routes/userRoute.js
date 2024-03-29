import userController from "../controller/userController.js";
import { Router } from "express";
const router = Router();
import passport from "passport";
import wrapAsync from "../utils/wrapAsync.js";

//Registration Route
router.post("/register", wrapAsync(userController.register));

//Login Route
router.post(
  "/login",
  passport.authenticate("local"),
  wrapAsync(userController.login)
);

export default router;
