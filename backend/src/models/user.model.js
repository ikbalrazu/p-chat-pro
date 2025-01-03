import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true,
        },
        fullName:{
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        profilePic:{
            type: String,
            default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
        profilePicId:{
            type: String,
            default: null
        },
        friends: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        }],
        friendRequests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        bio:{
            type: String,
            minlength:100
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User",userSchema);

export default User;