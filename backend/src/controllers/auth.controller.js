import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "../utils/cloudinary.js";

export const Signup = async (req,res) =>{
    const {fullName, email, password} = req.body;
    try {

        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        if(password.length < 6){
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            })
        }

        const user = await User.findOne({email});

        if(user) return res.status(400).json({message: "Email already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        });

        if(newUser){
            //generate jwt token here.
            generateToken(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });

        }else{
            res.status(400).json({message: "Invalid user data"});
        }

        
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const Login = async(req,res) =>{
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({message:"All fields required"});
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid credentials"});
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({message: "Internal server error"});
        
    }
}

export const Logout = (req,res) =>{
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
        
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const ForgotPassword = async(req,res)=>{
    const {email} = req.body;
    try {
        const user = await User.find({email});
        if(!user) return res.status(404).json({error: "Email not found"});

        //generate reset token
        const jwtToken = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
            expiresIn: "5m",
        });

        var mailOptions = {
            from: ' "Reset Your Password" <amalinvestorportal@gmail.com>',
            to: resetemail,
            subject: "Reset Password Link - Investment Portal",
            html: `<p>Your email: ${resetemail}! </p><p>Your id: ${id}</p> <p>You requested for reset password, kindly use this <a href="${process.env.Frontent_URL}/resetpassword/${id}/${jwtToken}">Link</a> to reset your password</p>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              res.json(error.message);
              //console.log(email);
            } else {
              res.json({ message: "send email successfully" });
              console.log("Email sent: " + info.response);
            }
        });

    } catch (error) {
        
    }
}

export const updateProfilePic = async (req,res) =>{
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message:"Profile pic is required"});
        }

        const user = await User.findById(userId);
        
        // Delete the old profile picture from Cloudinary
        if (user.profilePicId) {
            await cloudinary.uploader.destroy(user.profilePicId);
        }

        // Upload the new profile picture
        const uploadResponse = await cloudinary.uploader.upload(profilePic,{
            folder: "p-chat-pro",
            public_id: `${userId}_profile`,
            // transformation: [
            //     { width: 300, height: 300, crop: 'fill' },
            //     { quality: 'auto:low' },
            // ],
        });
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url, profilePicId:uploadResponse.public_id}, {new:true}).select("-password");
        
        res.status(200).json(updatedUser);
        
    } catch (error) {
        res.status(500).json({message:"Internal Server error"});
    }
}

export const updateProfileInfo = async(req,res)=>{
    try {
        const profile = req.body;
        const userId = req.user._id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({message:"Profile pic is required"});
        }

        const updatedInfo = await User.findByIdAndUpdate(userId,{fullName: profile.fullName, bio: profile.bio},{new:true}).select("-password");
        res.status(200).json(updatedInfo);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const checkAuth = async(req, res) =>{
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}