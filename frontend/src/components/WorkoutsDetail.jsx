import React from "react";
import formatDistanceTonow from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutsDetail = ({ workout, onDelete }) => {
  const { user } = useAuthContext();
  const deleteWorkout = async (id) => {
    if (!user) {
      return
    }
    try {
      await axios.delete(`${import.meta.env.VITE_URL_API}${id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      onDelete(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-64 md:max-w-[800px]">
        <div className="card bg-[#FFC55A] mb-4 flex md:flex-row items-start md:items-center justify-center h-full max-h-[145px]">
          <div className="card-body">
            <h2 className="card-title md:text-3xl">{workout.title}</h2>
            <div className="">
              <p>Load (kg):{workout.load}</p>
              <p>Reps:{workout.reps}</p>
              <p>{formatDistanceTonow(new Date(workout.createdAt), { addSuffix: true })}</p>
            </div>
          </div>
          <div className="flex flex-col absolute right-0 top-0 gap-2 md:gap-3 justify-center items-center mx-2 my-3 md:mx-4 md:my-5">
            <Link to={`/edit/${workout._id}`}>
              <button className="px-3 py-3 rounded-full bg-[#00215E]">
                <MdOutlineModeEditOutline className="text-white text-xs md:text-2xl"/>
              </button>
            </Link>
            <button className="px-3 py-3 rounded-full bg-red-700 " onClick={() => deleteWorkout(workout._id)}>
              <RiDeleteBin6Line className="text-white text-xs md:text-2xl"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutsDetail;
