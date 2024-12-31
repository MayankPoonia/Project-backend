import { asyncHandler } from "../utils/asyncHandler.js";

//ye method run kab hoga iske liye routes banega jaha pe url hit ho
const registerUser = asyncHandler( async (req, res) => {
    res.status(200).json({
        message: "ok" //json reponse dunga ok
    })
})


export { registerUser }