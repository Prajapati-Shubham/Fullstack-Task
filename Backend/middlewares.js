import jwt from "jsonwebtoken";
import User from "./models/user.js";

// const isLoggedIn=(req,res,next)=>{
//     if(!req.isAuthenticated()){
//         req.session.redirectUrl=req.originalUrl;
//         console.log(req.session);
//     }
//     next();
// }

const secretKey = "MySecretKey";

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  console.log(token);
  if (!token) {
    return res.status(401).json({ auth: false, message: "No token provided" });
  }
  jwt.verify(token, secretKey, (err, decode) => {
    if (err) {
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });
    }
    req.userId = decode.id;
    next();
  });
};

export default verifyToken;
