const workoutModel = require("../models/workoutmodel");
const mongoose = require("mongoose");

//get all workouts
const getAllWorkouts = async (req, res) => {
  const getallworkouts = await workoutModel.find({}).sort({ createdAt: -1 });

  res.status(200).json({ getallworkouts });
};

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

module.exports = {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout
};
