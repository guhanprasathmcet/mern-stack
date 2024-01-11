import React from "react"; // Import React if not already imported
import { useWorkoutHook } from "../hooks/useWorkoutHook";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutHook();

  const handleClick = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();

    console.log(json);

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json.deletedWorkout });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps (kg): </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span onClick={handleClick}>Delete</span>
    </div>
  );
};

export default WorkoutDetails;

//in this component we display the workout in ui 
//we import the our customhook for import { useWorkoutHook } from "../hooks/useWorkoutHook";  automatic update of the ui whenever changes made

//const { dispatch } = useWorkoutHook();
//we have get a dispatch for doing action so for that we import a dispatch in that hook

// //  const handleClick = async () => {
//   const response = await fetch("/api/workouts/" + workout._id, {
//     method: "DELETE",
//   });
//   const json = await response.json();

//   console.log(json);

//   if (response.ok) {
//     dispatch({ type: "DELETE_WORKOUT", payload: json.deletedWorkout });
//   }
// };

//next we have a handle click function which is used to delete theworkout when you click the span delete.
//first it uses fetch in that it uses two params first one is url so it uses /api/workouts/ and also + workout._id concat it beacuse when we
//click the delete button in the workout it takes thier id and pass a delete method so we give second argument as delete

//if the workout is delete then we pass it to workoutcontext there it will filter the deleteid and show the updated workout