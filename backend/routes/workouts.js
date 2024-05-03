import express from "express"
import { createWorkout, getAllWorkouts, getSingleWorkout, updateWorkout, deleteWorkout } from "../controllers/workoutController.js"
import requireAuth from "../middleware/requireAuth.js"

const router = express.Router()
router.use(requireAuth)

router.get('/', getAllWorkouts)

router.get('/:id', getSingleWorkout)

router.post('/', createWorkout)

router.delete('/:id', deleteWorkout)

router.patch('/:id', updateWorkout)

export default router