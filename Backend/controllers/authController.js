import authService from "../services/authService.js";
export const register = async (req, res,next) => {
   try {
    const result = await authService.register(req, res);
    res.json(result);

   } catch (error) {
    next(error);
   }
};