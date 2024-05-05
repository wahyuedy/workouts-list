import express from "express";
import "dotenv/config";
import router from "./routes/workouts.js";
import mongoose from "mongoose";
import cors from 'cors'
import routerUser from "./routes/user.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());

const corsOptions = {
  origin: 'https://workouts-list-api.vercel.app/', // Ganti dengan domain Anda
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Atur metode yang diizinkan
  credentials: true, // Atur header yang diizinkan
};

app.use(cors(corsOptions))

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

  export default app;