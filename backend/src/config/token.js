import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  try {
    const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });

    // console.log("Access Token Generated");

    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    // console.log("Refresh Token Generated");

    return { accessToken, refreshToken }; // Return karna mat bhoolna!
  } catch (error) {
    console.log("Error during token generation", error);
    return null;
  }
};
