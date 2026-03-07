import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "token not found" });
    }
    const decodeToken = jwt.verify(token, process.env.JWT_TOKEN);
    if (!decodeToken) {
      return res.status(400).json({ message: "token not verified" });
    }
    req.userId = decodeToken.userId;
    next();
  } catch (error) {
    return res.status(500).json(`isAuth Error ${error}`);
  }
};

export default isAuth;
