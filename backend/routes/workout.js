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
router.delete("/:id", workoutController.deleteWorkout);

//update a workout
router.patch("/:id", workoutController.updateWorkout);

module.exports = router;


//In this file first we import the express module then we import the controller where we can have all our get , post , delete , patch method 
//this file if for routing purpose

//we have assign a const router = express.Router(); all express router methods to router variable then we get all workouts

//router.get("/", workoutController.getAllWorkouts); it get all workouts in db 
//for example if user access http://localhost:4000/api/workouts it will first enter into server.js and it route to this file then this file passed it to
//the workoutController.getAllWorkouts method in workoutController.js file.

//router.get("/:id", workoutController.getSingleWorkout); this is used to get the particular single workout from db
//for example if user access http://localhost:4000/api/workouts/id it will return the workout which have that particular id so for that we have 
//workoutController.getSingleWorkout in workoutController.js file

//router.post("/", workoutController.createWorkout); this method is used to insert or post some values into db if you type something in body of
//the post method then it will submit the value to  db so for that we use the method name createWorkout so this route will pass the value to 
//workoutController.createWorkout in workoutController.js file

//router.patch("/:id", workoutController.updateWorkout); this is used to update the particular value in workout in db so we also pass the value like post
//but this time we just send the updated field only so for that we have method workoutController.updateWorkout in workoutController.js file 

//router.delete("/:id", workoutController.deleteWorkout); this method is used to delete the particular workout in db then we can change the method 
//type to delete and also pass like http://localhost:4000/api/workouts/id then it will delete that particular workout based on thier id.
