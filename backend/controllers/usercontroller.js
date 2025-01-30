import User from '../models/usermodel.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getDatauri from '../utils/dataUri.js'
import cloudinary from '../utils/cloudnary.js'

export const register = async (req,res)=>{
    try {

        const {fullname , email, phoneNumber , password, role} = req.body;
        console.log( fullname , email, phoneNumber , password, role );

        const file = req.file;
        
        if(!fullname || !email || !phoneNumber || !password  || !role){
            return res.status(401).json({
                message: "Something is missing",
                success : false
            });
        };

        const fileUri = getDatauri(file);
        const cloudresponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({email});

        if(user){
            return res.status(401).json({
                message: "User allready exist with this email",
                success : false
            });
        };

        const hashpassword = await bcryptjs.hash(password, 10);

        await User.create({
            fullname ,
             email, 
             phoneNumber, 
             password : hashpassword,
             role,
             profile:{
                profilephoto:cloudresponse.secure_url,
             }
        })
        
        return res.status(201).json({
            message: `User Created Successfully !`,
            success: true
        })
        
    } catch (error) {
        console.log(error);
    }
}


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check for missing data
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        // Find user by email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        // Compare passwords
        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Password or email is incorrect",
                success: false
            });
        }

        // Check user role
        if (role !== user.role) {
            return res.status(403).json({
                message: "Account doesn't exist with this role",
                success: false
            });
        }

        // Generate token
        const tokenData = {
            userId: user._id
        };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
        console.log(token);
        

        // Create user object to send in response
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        // Send response with token and user data
        return res.status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true,
                sameSite: 'strict'
            })
            .json({
                message: `Welcome back ${user.fullname}!`,
                user,
                success: true
            });

    } catch (error) {
        console.error("Login Error:", error); // Log the error for debugging
        return res.status(500).json({
            message: "An error occurred while logging in",
            success: false
        });
    }
};



export const logout = async (req,res)=>{
    try {
        return res.status(201).cookie("token", "",{maxAge:0}).json({
            message: "Logged out successfully !",
            success: true
        });

    } catch (error) {
        console.log(error);
        
    }
}


export const updateProfile = async(req,res)=>{

    try {
        const {fullname, email, phoneNumber, bio , skills} = req.body;
        const file = req?.file;

        // console.log(fullname, email, phoneNumber, bio , skills);
        
    
        // cloudnary Ayyega idher : 
            const fileUri = getDatauri(file);
            const cloudresponse = await cloudinary.uploader.upload(fileUri.content,{resource_type: "raw"});
            console.log(cloudresponse.secure_url);
      

         let skillsArray;
        if(skills){
             skillsArray = skills.split(",");
        }
        
        const userId= req.id;    // middleware authentication 

        let user = await User.findById(userId);
        if(!user){
            return res.status(401).json({
                message: "User not found ....",
                success : false
            })
        }
        
        // update user data 
        if(fullname) user.fullname = fullname
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skills)  user.profile.skills = skillsArray;
    

        // resume comes here later 
        if(cloudresponse){
            user.profile.resume = cloudresponse?.secure_url
            user.profile.resumeOriginalName = file?.originalname
        }

        await user.save();

        user ={
            _id :user._id,
            fullname :user.fullname,
            email:user.email,
            phoneNumber :user.phoneNumber,
            role : user.role,
            profile:user.profile
        }

        return res.status(201).json({
            message: "User update successfully ...",
            user,
            success : true
        })

    } catch (error) {
        console.log(error);
        
    }
}
