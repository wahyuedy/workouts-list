import express from "express"
import { loginUser, signupUser } from "../controllers/userController.js"

const routerUser = express.Router()

// login route
routerUser.post('/login', loginUser)

// signup route
routerUser.post('/signup', signupUser)


export default routerUser