import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { mealRouter } from "./routes/meal.routes";
import { ingredientRouter } from "./routes/ingredient.routes";

//Initialization
const app = express();
dotenv.config();
app.use(morgan("dev"));
app.use(express.json());

//CORS
const allowedOrigins = ["http://localhost:4200"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.use('/meals', mealRouter);
app.use('/ingredients', ingredientRouter);



//Start the Server
const server = app.listen(process.env.PORT, () => {
  console.log("Backend Server started on Port " + process.env.PORT);
});
