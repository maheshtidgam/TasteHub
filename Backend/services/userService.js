import { User } from "../postgres/postereg.js";

const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

export const userService = {
  getAllUsers,
};
