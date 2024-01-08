import { useEffect, useState } from "react";
import WorkoutDetails from "../Components/workoutDetails";
import WorkoutForm from "../Components/WorkoutForm";

const Home = () =>{
    const[workouts,setworkouts] = useState(null);

    useEffect(()=>{
        const fetchWorkouts = async()=>{
            //so now the fetch api want to get data in api workouts so it will go to package.json and there we use 
            //proxy so it will go to that port and act as http://localhost:4000/api/workouts and get data and solved cors error
            const response = await fetch('/api/workouts');
            const data = await response.json();
            console.log(data);
            if(response.ok){
                setworkouts(data.getallworkouts);
            }
        }

        fetchWorkouts();
    },[])
    return(
        <div>
            <div className="workouts">
                {workouts && workouts.map((workout)=>(
                    <WorkoutDetails key={workout._id} workout={workout}/>  
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home;