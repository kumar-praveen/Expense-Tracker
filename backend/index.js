import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./database/dbConfig.js";
import userRoute from "./routes/user.route.js";
import expenseRoute from "./routes/expense.route.js";

dotenv.config({});

const app = express();
const port = 3000;


const corsOptions = {
  origin: ["http://localhost:5173", process.env.FRONTEND_URL], 
  credentials: true,
};
app.use(cors(corsOptions));


app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/v1/user", userRoute);
app.use("/api/v1/expense", expenseRoute);

app.listen(port, () => {
  console.log(`Server is started and listening to port ${port}`);
  connectDb();
});

// app.get("/", (req, res) => {
//   res.send("Welcome this is root route");
// });
