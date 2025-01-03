import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js"

const router = Router();

//jab user register karega tab middle ware aayega jo avar,coverimage mangega
router.route("/register").post(
    upload.fields([ //upload.fields me array aate hai of different fields 
        {
            name: "avatr",
            maxCount: 1,  //maximum  only 1 image can upload

        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
    ); //yaha se control user.controller.js ke register user pe jayega
    //client post the image to server

export default router;
