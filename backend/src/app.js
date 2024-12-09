import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
 
const app = express();

app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true,
}));

app.get("/",(req,res)=>{
    res.send("welcome pchatpro");
})

app.use("/api/auth",authRoutes);



export default app;