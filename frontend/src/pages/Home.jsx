import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkoutsDetail from "../components/WorkoutsDetail";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const [workouts, setWorkouts] = useState([]);
  const { user } = useAuthContext();
  useEffect(() => {
    if (user) {
      axios.get(`${import.meta.env.VITE_URL_API}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      }).then((response) => {
        setWorkouts(response.data);
      });
    }
  }, [user]);

  const handleDelete = (id) => {
    setWorkouts(workouts.filter((workout) => workout._id !== id));
  };

  return (
    <div style={{ overflowY: workouts.length > 4 ? 'auto' : 'unset', maxHeight: 'calc(100vh - 75px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {workouts.map((workout) => (
        <WorkoutsDetail key={workout._id} workout={workout} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default Home;
