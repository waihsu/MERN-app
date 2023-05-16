import { useContext, useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import User from "./users";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const contextData = useContext(AuthContext);
  const { token } = contextData;
  // console.log("home token:", token);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/workouts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    if (token) {
      fetchWorkouts();
    }
  }, [dispatch, token]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
      <User />
    </div>
  );
};

export default Home;
