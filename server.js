import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";

//routers
import jobRouter from "./routes/jobRouter.js";
import mongoose from "mongoose";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); //console da Response kodu ve resposne süresi (ms) gözükür
}

app.use(express.json()); //json formatındaki istekleri karsılamak ıcın /middleware olarak kullanılır

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "data receiverd", data: req.body });
});

app.use("/api/v1/jobs", jobRouter);

// app.use("*", (req, res) => {
//   //any method any urls
//   res.status(404).json({ msg: "not found" }); //notfound middleware route yokken calısır
// }); //express aynı msj ı yollyuor gerek yok

app.use((err, req, res, next) => {
  //error middleware  route varken hata olsutgunda
  console.log(err);
  res.status(500).json({ msg: "smthg went wrong" });
});

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
