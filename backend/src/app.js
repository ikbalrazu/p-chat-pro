import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
 
const app = express();

app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("welcome pchatpro");
})

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);


export default app;
