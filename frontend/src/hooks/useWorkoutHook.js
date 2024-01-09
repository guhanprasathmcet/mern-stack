import { workoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutHook = () => { 
    const context = useContext(workoutsContext);

    if(!context){
        throw new Error("useworkoutcontext must be used within an workoutscontextprovider");
    }

    return context;
}