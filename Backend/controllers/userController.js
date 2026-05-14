import { userService } from "../services/userService.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const result = await userService.getAllUsers(req, res);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const userRoles = [
  {
    id: 1,
    role: "admin",
    displayName: "Admin",
  },
  {
    id: 2,
    role: "credit_manager",
    displayName: "Credit Manager",
  },
];

export const roles = async (req, res, next) => {
  try {
    const result = await userRoles;
    res.json(result);
  } catch (error) {
    next(error);
  }
};
