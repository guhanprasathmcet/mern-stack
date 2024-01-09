import { createContext, useReducer } from "react";

export const workoutsContext = createContext();

export const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUT":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: null,
  });

  return (
    <workoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </workoutsContext.Provider>
  );
};

//in here children props we pass is whatever we wrap inside the WorkoutContextProvider method we have wrap app componnet
// in WorkoutContextProvider method in index.js file

//when we update the value in home.js first dispatch will enter into hook then hook will redirect to workoutsContext using useContext()
//then it will be coming into have WorkoutContextProvider inside we have workoutsContext.Provider the value and dispatch we pass will be enter into an
//  const [state, dispatch] = useReducer(workoutReducer, {
//     workouts: null,
//   });
//and the reducer function will update the value or set the value based on the type we send in dispatch.......
