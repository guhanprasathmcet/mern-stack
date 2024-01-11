const mongoose = require("mongoose");

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load : {
        type: Number,
        required: true
    }
},{timestamps:true})

const Workout = mongoose.model('Workout',workoutSchema);

module.exports = Workout;

//in this file we define the structure and use model for our collection in db

//const Schema = mongoose.Schema this line have a moongose.schema assigns to Schema variable which is responsible for defining structure of a 
//collection


//and we create  a new schema for our table which is workout schema which holds the structure of our collection we can create  a structure of collection
//using new Schema() and inside that Schema class we define our structure of the collection and timestamps is used to define the time for our documents
//in the collection


//const Workout = mongoose.model('Workout',workoutSchema);
//after that we  can create  a collection name workout with the structure we defined as  a workout schema using  mongoose.model
//and after that we export that modal
