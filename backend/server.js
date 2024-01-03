const express = require("express");
const dotenv = require("dotenv");
const workoutRoutes = require('./routes/workout');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.method);
    console.log(req.path);
    next();
})

app.use('/api/workouts',workoutRoutes);

const port = process.env.PORT;

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected successfully");

        app.listen(port,()=>{
            console.log(`listening on port ${port}`)
        })
    })
    .catch((err)=>{
        console.log('error',err);
    })
