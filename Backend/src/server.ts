import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";

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


app.get('/', (req, res) => {
  res.json({'Message':'Works'})
})



//Start the Server
const server = app.listen(process.env.PORT, () => {
  console.log("Backend Server started on Port " + process.env.PORT);
});
