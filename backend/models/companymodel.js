import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name:{
        type: String,
        require:true,
        unique: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    location:{
        type:String
    },
    website:{
        type:String
    },
    description:{
        type:String
    },
    logo:{
        type:String   // URL to company logo 
    }
},{timestamps:true})

 const Company = mongoose.model('Company',CompanySchema);

 export default Company;
