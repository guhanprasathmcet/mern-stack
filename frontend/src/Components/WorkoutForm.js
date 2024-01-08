import { useState } from "react";

const WorkoutForm = () => {
  const initialExcersiedetails = {
    title: "",
    load: 0,
    reps: 0,
  };

  const [workoutdetails, setworkoutdetails] = useState(initialExcersiedetails);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = workoutdetails.title;
    const load = workoutdetails.load;
    const reps = workoutdetails.reps;

    const workout = { title, load, reps };
    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setworkoutdetails(initialExcersiedetails);
      setError(null);
      console.log('new workout added', json);
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a title workout</h3>
      <label>Exercise title</label>
      <input
        type="text"
        onChange={(e) => {
          setworkoutdetails((prevWorkDetails) => ({
            ...prevWorkDetails,
            title: e.target.value,
          }));
        }}
        value={workoutdetails.title}
      />
      <label>Load (in kg)</label>
      <input
        type="number"
        onChange={(e) => {
          setworkoutdetails((prevWorkDetails) => ({
            ...prevWorkDetails,
            load: e.target.value,
          }));
        }}
        value={workoutdetails.load}
      />
      <label>Reps</label>
      <input
        type="number"
        onChange={(e) => {
          setworkoutdetails((prevWorkDetails) => ({
            ...prevWorkDetails,
            reps: e.target.value,
          }));
        }}
        value={workoutdetails.reps}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
