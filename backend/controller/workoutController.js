const workoutModel = require("../models/workoutmodel");
const mongoose = require("mongoose");


//first we import the model we create in the workoutmodel file and then import mongoose module
//Note : we import model because in mongoose model have  a built in methods for get , post , put , delete and patch so it will be used for us to
//to access a db with respective action

//get all workouts
const getAllWorkouts = async (req, res) => {
  const getallworkouts = await workoutModel.find({}).sort({ createdAt: -1 });

  res.status(200).json({ getallworkouts });
};

//getAllWorkouts is a async function which  is used to get all workout using built in method of find({}) and after that we sort that 
//method .sort({ createdAt: -1 }); this means the recently created workout will be shown first like descending order.
//if it succeed we can send response as 200 and also send a response of all  workouts as  a json.

//get a single workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  //checking this as a valid id using mongoose
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "please enter a valid id" });
  }

  const getsingleworkout = await workoutModel.findById(id);

  if (!getsingleworkout) {
    return res.status(404).json({ message: `${id} no such workout` });
  }

  res.status(200).json({ getsingleworkout });
};

//getSingleWorkout is a async function which is used to get a workout based on a id we pass as an argument which used the mongoose model's 
//built in method as findById(id) we can pass our id to this function.if it not return an expected response then we send a error message and
//status code of 404.if it succeed we can send response as 200 and also send a response of single workout as  a json.


//create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  try {
    const createWorkout = await workoutModel.create({ title, load, reps });
    res.status(200).json({ createWorkout });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//createWorkout is a async function which is used to send or create a workout to a db so first this function takes
//const { title, load, reps } = req.body; title , load and reps from req.body and we can send this request to a db using create method which 
//means create a new workout and inside that create method we pass title,load,reps and if it successfully sends then we get 200 status and our created 
//workout as a response otherwise it throws an error..

//delete a workout

const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  // Checking a valid id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Enter a valid id" });
  }

  try {
    const deletedWorkout = await workoutModel.findOneAndDelete({ _id: id });

    // Checking that id is present or not
    if (!deletedWorkout) {
      return res.status(404).json({ message: "Not found!!!" });
    }

    // Send a successful response
    return res.status(200).json({ deletedWorkout });
  } catch (error) {
    // Handle any errors that occur during deletion
    console.error("Error deleting workout:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


//deleteWorkout is a  async function which is used to delete a workout from db so first it checks our workout id we send for deleteion is valid using
//built in moongose method mongoose.Types.ObjectId.isValid(id) if its not valid then we throws an error as enter a valid id then we can 
//try to delete the workout using mongoose built in method as findOneAndDelete and inside this we pass an id the reason for using _id:id in mongodb
//database the id documetns have underscore before this name so we can use like _id.after that we can pass that id to db and db deelete then send a response
//status as 200 and also send a deleted workout as a response


//update a workout

const updateWorkout = async(req,res)=>{
    const { id } = req.params;

    //checking a valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "enter a valid id" });
    }

    const updateworkout = await workoutModel.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!updateWorkout){
        res.status(404).json({error:"not found for updating"});
    }

    res.status(200).json({updateworkout});
}

//updateWorkout is a async function whichis used to update a workout first we can get id from params const { id } = req.params;
//localhost://4000/api/workouts/1 then this const { id } = req.params takes 1 as a id .after taking id we can check a id is vali using mongoose
//built in method after that we can update a workout using findOneAndUpdate method and pass a 2 arguments one is id which we are going to update
//then second one is content we are going to update we use spread operator because whatever content we need to update will be updated the
//remainig contennt stills same if it succeed then we will send an updated workout as a response otherwise throws an error.

module.exports = {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout
};
