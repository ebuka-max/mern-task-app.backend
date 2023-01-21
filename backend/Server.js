const dotenv = require("dotenv").config();
const express = require("express")
const connectDB = require("./config/connectDB");
const Task = require("./model/taskModel");
const taskRoutes = require("./routes/taskRoute")
const cors = require("cors")

const app = express()

// Middleware 
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin: ["http://localhost:3000", "https://mern-task-app.onrender.com"]
}));
app.use("/api/tasks",taskRoutes)


// Routes
app.get("/", (req, res) => {
    res.send("Home Page")
})






const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
};
startServer();
