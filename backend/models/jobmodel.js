import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema({
    title:{
        type:String,
        require: true
    },
    description :{
        type: String,
        require: true
    },
    requirements:[{
        type:String
    }],
    salary:{
        type:Number,
        require:true
    },
    experienceLevel:{
        type:Number,
        require: true
    },
    location:{
        type:String,
        require:true
    },
    jobType:{
        type:String,
        require:true
    },
    position:{
        type:Number,
        require:true
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Company',
        require:true
    },
    create_by :{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    },
    applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application'
    }]
},{timestamps:true});

 const Job = mongoose.model('Job',JobSchema);

 export default Job;
