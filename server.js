require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const workoutRoutes = require("./routes/workouts")

const PORT = process.env.PORT
const cors = require("cors");

const app = express()

app.use(cors({
    origin: ["http://localhost:1000",
        "mern-workouts-app.onrender.com"]
}));
app.use(express.json())


app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//routes
app.use("/api/workouts", workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Running On Port ${PORT}`);
        })

    })
    .catch((error) => {
        console.log(error);
    })

// listen for requests

