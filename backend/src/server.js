import express from "express"
import dotenv from "dotenv"
import cors from 'cors' 
import path from "path"

import rateLimiter from "./middleware/rateLimiter.js";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"


dotenv.config();


const app = express()
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()


//middleware

if(process.env.NODE_ENV !== "production"){
     app.use(cors({
        origin: "http://localhost:5173"
    }));
}

app.use(express.json()) //this middleware will parse the JSON bodies: req.body
app.use(rateLimiter)

// app.use((req,res,next) => {
    //     console.log(`Req method is ${req.method} & Req URL is ${req.url}`)
    //     next()
    // })
    
app.use("/api/notes",notesRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}


    
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port ",PORT);
    });

});

