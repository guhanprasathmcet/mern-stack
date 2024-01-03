const express = require("express");
const workoutController = require('../controller/workoutController')

const router = express.Router();

//get all workouts
router.get("/", workoutController.getAllWorkouts);

//get a single workout
router.get("/:id", workoutController.getSingleWorkout);

//post a workout
router.post("/", workoutController.createWorkout);

//delete a workout
router.delete("/:id", (req, res) => {
  res.send(`delete a workout`);
});

//update a workout
router.patch("/:id", (req, res) => {
  res.send(`update a workout`);
});

module.exports = router;
