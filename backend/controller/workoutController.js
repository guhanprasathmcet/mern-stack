const workoutModel = require("../models/workoutmodel");

//get all workouts

//get a single workout

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


module.exports = {createWorkout};
