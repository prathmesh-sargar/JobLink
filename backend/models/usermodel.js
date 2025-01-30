import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({

    fullname:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    phoneNumber:{
        type: Number,
        require: true
    },
    password: {
        type: String,
        require:  true
    },
    role:{
        type: String,
        enum: ['student','recruiter'],
        require: true
    },
    profile:{
        bio:{type: String},
        skills:[{type:String}],
        resume : {type: String},  // URL to resume 
        resumeOriginalName: {type:String},
        company:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },
        profilephoto:{
            type:String,
            default:""
        }
    }

},{timestamps:true});

 const   User = mongoose.model("User",UserSchema);

 export default User;