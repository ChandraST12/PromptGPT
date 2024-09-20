import { Router } from "express";
import { getAllUsers,  userSignup , userLogin, verifyUser } from "../controllers/user-controllers";
import {validate , signupValidator, loginValidator} from "../utils/validators"
import { verifyToken } from "../utils/token-manager";

const userRoutes = Router();

userRoutes.get("/",getAllUsers)
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status",verifyToken,verifyUser)

export default userRoutes



