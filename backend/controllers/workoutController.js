import WorkoutModel from "../models/WorkoutModel.js"
import mongoose from "mongoose"

export const getAllWorkouts = async (req, res) => {
    try {
        const user_id = req.user._id
        const workouts = await WorkoutModel.find({user_id}).sort({createdAt: -1})
        res.status(200).json(workouts)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const getSingleWorkout = async (req, res) => {
    try {
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: 'No such workout'})
        }
        const workout = await WorkoutModel.findById(id)
        if (!workout) {
            return res.status(404).json({error: 'No such workout'})
        }
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body
    try {
        const user_id = req.user._id
        const workout = await WorkoutModel.create({title, load, reps, user_id})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const deleteWorkout = async (req, res) => {
    try {
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: 'No such workout'})
        }
        const workout = await WorkoutModel.findByIdAndDelete({_id: id})
        if (!workout) {
            return res.status(404).json({error: 'No such workout'})
        }
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const updateWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such workout' });
        }

        const workout = await WorkoutModel.findOneAndUpdate(
            { _id: id, user_id }, 
            req.body, 
            { new: true } 
        );

        if (!workout) {
            return res.status(404).json({ error: 'No such workout' });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};