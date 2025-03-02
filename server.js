import "express-async-errors"; //trycatch yerine en ustte bunu kullandık hata olsa bile  server calıssın
//bu hatayı error middleware e yönlendiri
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";

//routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

//Middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

import mongoose from "mongoose";
import cookieParser from "cookie-parser";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); //console da Response kodu ve resposne süresi (ms) gözükür
}

app.use(cookieParser());
app.use(express.json()); //json formatındaki istekleri karsılamak ıcın /middleware olarak kullanılır

app.get("/", (req, res) => {
  res.send("hello world");
});

// app.get("/api/v1/test", (req, res) => {
//   res.json({ msg: "test route" });
// });
// import { validateTest } from "./middleware/validationMiddleware.js";

// app.post("/api/v1/test", validateTest, (req, res) => {
//   const { name } = req.body;
//   res.json({ message: `hello ${name}` });
// });

app.use("/api/v1/jobs", authenticateUser, jobRouter); //jobRouterlarda auth kullanacagıız ıcın basına yazdık
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

// app.use("*", (req, res) => {
//   //any method any urls
//   res.status(404).json({ msg: "not found" }); //notfound middleware route yokken calısır
// }); //express aynı msj ı yollyuor gerek yok

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
