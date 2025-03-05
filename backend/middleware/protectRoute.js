import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    //get the token from cookies
    const token = await req.cookies.token;

    if (!token) {
      res.status(401).json({ error: "Unauthorized - No Token Provided" });
    }

    //verifying the token (returns the decoded token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      res.status(401).json({ error: "Unauthorized - Invlaid Token" });
    }

    //userId because it is the name we gave when signing the toke in generateToken.js
    //minus the password so we dont send back the password
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(401).json({ error: "User not found" });
    }
    //set the verfied user into req so that we can access it in message.routes.js hence in message.controller.js
    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
