import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  //creating the JWT Token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  //settin the jwt token into cookie
  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, //to prevent XSS attacks cross-site scripting attack
    sameSite: "strict", //to prevent CSRF attacks, cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
