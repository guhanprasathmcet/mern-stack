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



// in this file  we first import the things we need where 
// const express = require("express"); is used to import express in this file then 
// const dotenv = require("dotenv"); this is for handling environment variabes
// const workoutRoutes = require('./routes/workout'); and this file has the routes for every get,post ,patch,delete methods.
// const mongoose = require('mongoose'); this is for connecting db

// so then we use dotenv.config(); to process envirnoment variables in this file 
// then assign all express mthods to app varaible

// app.use(express.json()); so this is used to parse the json type objects.if you normally console log the req.body it will show undefined in console
// so use this to parse the jsontype objects and use it in yourr file

// app.use('/api/workouts',workoutRoutes); this is for routes when you access the '/api/workouts' it will redirect the route to workoutRoutes file we import
// and that will access that routes

// const port = process.env.PORT; assign a port 4000 we defined in the environment variables to port variable

// then connect to db using mongoose 
// first using the default mongoose method connect and pass the uri string you get in the mongodb atlas then if the connection is success
// it will give connected successfully in console then start to listening on port 4000.otherwise it catch an error and throws an error




