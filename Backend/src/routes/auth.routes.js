import { Router } from "express";
import { verifyAccesstoken } from "../middleware/auth.middleware.js";
import { loginUser, registerUser, logoutUser, refreshTokens, getCurrentUser } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.post("/refresh", refreshTokens);
authRouter.get("/me",verifyAccesstoken, getCurrentUser);

export default authRouter;