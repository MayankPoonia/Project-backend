import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser) //yaha se control user.controller.js ke register user pe jayega


export default router