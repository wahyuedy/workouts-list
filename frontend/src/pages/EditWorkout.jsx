import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const EditWorkout = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null)
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthContext();

  const getSingleWorkout = async () => {
    if (!user) {
      setError('You must be logged in')
      return
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_API}${id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      setTitle(response.data.title)
      setLoad(response.data.load)
      setReps(response.data.reps)
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    getSingleWorkout()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitle("");
    setLoad("");
    setReps("");
    try {
      const workout = {
        title: title,
        reps: reps,
        load: load,
      };
      await axios.patch(`${import.meta.env.VITE_URL_API}${id}`, workout, {
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
      <h2 className="text-[#FFC55A] flex justify-center items-center font-bold text-xl">Edit a Workout</h2>
      <div className="flex justify-center mt-3">
        <form className="h-lvh" onSubmit={handleSubmit}>
          <div className="form-control max-w-xl">
            <label className="label">
              <span className="label-text text-[#FFC55A] text-lg font-bold">Excersize Title</span>
            </label>
            <input type="text" className="input w-[320px] md:w-[500px]" required onChange={(e) => setTitle(e.target.value)} value={title} />
          </div>
          <div className="form-control max-w-xl">
            <label className="label">
              <span className="label-text text-[#FFC55A] text-lg font-bold">Load (in kg)</span>
            </label>
            <input type="number" className="input md:w-[500px]" required onChange={(e) => setLoad(e.target.value)} value={load} />
          </div>
          <div className="form-control max-w-xl">
            <label className="label">
              <span className="label-text text-[#FFC55A] text-lg font-bold">Reps</span>
            </label>
            <input type="number" className="input md:w-[500px]" required onChange={(e) => setReps(e.target.value)} value={reps} />
          </div>
          <div className="form-control mt-6 w-full md:w-[500px]">
            <button className="btn bg-[#FFC55A] border-[#FFC55A] hover:bg-black text-black hover:text-white font-bold text-base hover:border-[#FFC55A]">Save</button>
          </div>
          {error && <div className='text-white'>{error}</div>}
        </form>
      </div>
    </>
  );
};

export default EditWorkout;
