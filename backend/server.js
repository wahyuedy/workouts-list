import express from "express";
import "dotenv/config";
import router from "./routes/workouts.js";
import mongoose from "mongoose";
import cors from 'cors'
import routerUser from "./routes/user.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(cors())

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(`${process.env.WORKOUTS_API_URL}`, router);
app.use(`${process.env.USER_API_URL}`, routerUser);

mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to db & listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
