import mongoose, { mongo } from "mongoose";
import { compile } from "morgan";

const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "my city",
    },
  },
  { timestamps: true }
); //createdData ve UpdateData yı tutar mangoDB

export default mongoose.model("Job", JobSchema); //collection yani table
