import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from  "cors"
import ConnectDB from "./db/dbConnect.js";
import userRoute from './routes/userRoute.js'
import companyRoute from './routes/companyRoute.js'
import jobRoute from './routes/JobRoute.js'
import applicationRoute from './routes/applicationRoute.js'


const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

// middlewares 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
// Allow credentials and specific origin
const corsOptions = {
    origin: "http://localhost:5173", // Frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed methods
    credentials: true, // Allow cookies or other credentials
};
app.use(cors(corsOptions));
ConnectDB();

// apis  
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
