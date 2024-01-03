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

//update a workout

module.exports = { createWorkout, getAllWorkouts, getSingleWorkout };
