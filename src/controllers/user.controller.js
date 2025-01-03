import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

//ye method run kab hoga iske liye routes banega jaha pe url hit ho
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  //usermodel se inspired hokar sari details except token and watch history kyoki not needed in registration
  //validation(like email format correct ho ,not empty,etc)
  //check if user already existed: username, email
  //check for images,check for avatar
  //upload them to cloudinary, avatar hua upload check karo
  //create user object(mongo db me jayega) - create entry in db
  //remove password and refresh token field response 
  //check for user creation ho gaya kya
  // return response with user details(except password and refresh token) otherwise error


  //get user details from frontend
  const {fullName, email, username, password } = req.body
  console.log("email: ", email);  
  //iske baadpostman mai body se raw se json me daaldo email password then send terminal pai id password aajayegi
  // file handling ke liye import upload in user routes from multer



  //validation part
  /*if(fullName === "") {
    throw new ApiError(400, "fullname is required")}*/
  //apierror ko constructor me required hai statuscode and message
  //it is needed if again and again ,better to use another method

  //.some array accept karega condition lagayega ,fields?. agar fields defines hai 
  //to aage paas ho jayega,trim spaces hata dega,//fir agar empty hua to if block executes
  if(
    [fullName, email, username, password].some((field) => 
    field?.trim() === "")

  ) {
    throw new ApiError(400, "All fields are required")
  }
  //can add more validation here later on


  //already exist to nahi karta ,for that user model ask to database
  //$or ek bhi match kargaya to existedUser hoga true
  const existedUser = User.findOne({
    $or: [{ username }, { email}]
  })

  if (existedUser) {
    throw new ApiError(409, "User with email or user already exists")
  }

  //image request
  //multer gave access to req.files
  //its just return the path of uploaded file like image 
  //everything uploaded is array so we choose [0]
  //?. kya pata na mile
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  //abhi tak its still in the server not in cloudinary


  //Avatar is compulsary
  if(!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required")
  }


  //upload to cloudinary by giving localpath to uploadoncloudinary function
  //ye function url dega so that can upload to databse in users entry
  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)


  //check avatar is uploaded or not as it is compulsary
  if(!avatar) {
    throw new ApiError(400, "Avatr file is required")
  }

  //user entry in databse
  //user model hi baat karta hai db se
  //user ke through we can enter data in db
  //db me error is commom so asyncHandler will handle that
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",  //agar coverImage hai to url lelo othersiee keep it empty
    email,
    password,
    username: username.toLowerCase()

  })

  //user bangaya check karte hai by taking entry from db but we dont want to show password and refreshtoken
  //.select mean kya kya nahi chahiye
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
  }

  //userentry bangayi to user ko response me info bhej dete hai
  //we can send data to user in response
  //api response take status code message data etc as parameter
  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  )







  


  


  
});

export { registerUser };
