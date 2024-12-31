import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, //cloudinary url
            required: true,
        },
        coverImage: {
            type: String, //cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types>ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true
    }
)



userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next(); //agar password midified nahi hai to direct next pe jao 


    this.password = bcrypt.hash(this.password, 10)  //encrypt password ,take rounds 10
    next()
})

//check enter password is corrrct or not
userSchema.methods.isPasswordCorrect = async function
(password){
    return await brcypt.compare(password, this.password)  //compare entered pwd with encrypted pwd
}


//to generate accesstoken by jwt.sign()
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiredIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}



userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiredIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}










export const User = mongoose.model("User", userSchema)