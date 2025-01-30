import Company from "../models/companymodel.js";
import cloudinary from "../utils/cloudnary.js";
import getDatauri from "../utils/dataUri.js";

export const registerCompany = async(req,res)=>{
    try {
        const {companyName}= req.body;
        console.log("company :",companyName);
        
        if(!companyName){
            return res.status(400).json({
             message: "Comapany name is required ",
             success: false
            })
        };

        let company = await Company.findOne({name: companyName});
        if(company){
            return res.status(400).json({
                message: "You can't register same name company used another name ok ",
                success: false
            })
        };

        company = await Company.create({
            name : companyName,
            userId: req.id
        });

        return res.status(200).json({
            message: "Comapny Created Successfully ...",
            company,
            success : false
        });

    } catch (error) {
        console.log(error);
        
    }
}


export const getAllCompany = async(req,res)=>{
    try {

        const userId = req.id;  //    logged in user Id 
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message: "Companies not found",
                success : false
            })
        };

        return res.status(200).json({
            message : `All companies list is !`,
            companies,
            success:true
        });
        
    } catch (error) {
        console.log(error);
        
    };
};


export const getcompanyById = async(req,res)=>{

    try {
        const companyId = req.params.id;   // get Id from URL 
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message: "Company not found",
                success : false
            })
        };

        return res.status(200).json({
            company,
            success:true
        });
    } catch (error) {
        console.log(error);        
    }
};

export const updateCompany = async(req,res)=>{
    try {
        const {name,location,website ,description } = req.body;
        const file = req.file;

        
        // cloudinary Ayyega idher : 
        const fileUri = getDatauri(file);
        const cloudresponse = await cloudinary.uploader.upload(fileUri.content);
        console.log("company logo",cloudresponse.secure_url);

        const logo = cloudresponse.secure_url;

        const updatedData = {name , location , website ,description,logo};
        console.log("updated data : ",updatedData);
        
        const company = await Company.findByIdAndUpdate(req.params.id,updatedData);
        if(!company){
            return res.status(404).json({
                message: "company not found",
                success: true
            })
        };

        return res.status(200).json({
            message: "Company information updated ",
            company,
            success: true
        });

    } catch (error) {
        console.log(error);
        
    };
};
