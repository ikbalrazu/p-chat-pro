import app from './app.js';
import dotenv from 'dotenv';
import { dbConnect } from './config/db.connect.js';

dotenv.config();

const PORT = process.env.PORT || 4000;


app.listen(PORT,()=>{
    console.log("server is running on PORT:"+ PORT);
    dbConnect();
});