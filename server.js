import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import 'dotenv/config'

const app = express();

// Connect database
connectDB();

app.use(express.json());

app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));
app.use("/api/auth", authRoutes);

app.get("/", (req,res)=>{
    res.send("API Running");
});

// IMPORTANT for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});