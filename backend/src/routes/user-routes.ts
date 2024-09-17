import { Router } from "express";
import { getAllUsers, userSignup } from "../controllers/user-controllers";
import {validate , signupValidator} from "../utils/validators"

const userRoutes = Router();

userRoutes.get("/",getAllUsers)
userRoutes.post("/signup",validate(signupValidator),userSignup)

export default userRoutes



