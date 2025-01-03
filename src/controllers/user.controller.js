import { asyncHandler } from "../utils/asyncHandler.js";

//ye method run kab hoga iske liye routes banega jaha pe url hit ho
const registerUser = asyncHandler(async (req, res) => {
  // Example response for successful registration
  res.status(200).json({
    success: true,
    message: "User registered successfully!", //json reponse dunga ok
  });
});

export { registerUser };
