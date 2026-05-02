import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) return res.status(400).json({ message: "Token not found" });

    const decodedToken = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    if (!decodedToken)
      return res.status(400).json({ message: "Invalid token" });

    console.log(decodedToken.userId);
    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "isAuth error:", error: error.message });
  }
};
