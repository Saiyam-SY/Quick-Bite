export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    // console.log(userId);

    if (!userId) return res.status(400).json({ message: "User Id not found" });

    return res.status(200).json({ message: `User ID: ${userId}` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "getCurrentUser error", error: error.message });
  }
};
