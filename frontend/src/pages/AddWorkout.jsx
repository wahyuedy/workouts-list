import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const AddWorkout = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null)
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in')
      return
    }
    setTitle("");
    setLoad("");
    setReps("");
    try {
      const workout = {
        title: title,
        reps: reps,
        load: load,
      };

      const response = await axios.post(`${import.meta.env.VITE_URL_API}`, workout, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="text-[#FFC55A] flex justify-center items-center font-bold text-xl">Add a New Workout</h2>
      <div className="flex justify-center mt-3">
        <form className="" onSubmit={handleSubmit}>
          <div className="form-control max-w-xl">
            <label className="label">
              <span className="label-text text-[#FFC55A] text-lg font-bold">Exercise Title</span>
            </label>
            <input type="text" placeholder="Example: Bench Press" className="input w-[320px] md:w-[500px]" required onChange={(e) => setTitle(e.target.value)} value={title} />
          </div>
          <div className="form-control max-w-xl">
            <label className="label">
              <span className="label-text text-[#FFC55A] text-lg font-bold">Load (in kg)</span>
            </label>
            <input type="number" placeholder="Example: 25" className="input md:w-[500px]" required onChange={(e) => setLoad(e.target.value)} value={load} />
          </div>
          <div className="form-control max-w-xl">
            <label className="label">
              <span className="label-text text-[#FFC55A] text-lg font-bold">Reps</span>
            </label>
            <input type="number" placeholder="Example: 40" className="input md:w-[500px]" required onChange={(e) => setReps(e.target.value)} value={reps} />
          </div>
          <div className="form-control mt-6 w-full md:w-[500px]">
            <button type="submit" className="btn bg-[#FFC55A] border-[#FFC55A] hover:bg-black text-black hover:text-white font-bold text-base hover:border-[#FFC55A]">Add Workout</button>
          </div>
          {error && <div className='text-white'>{error}</div>}
        </form>
      </div>
    </>
  );
};

export default AddWorkout;
