import mongoose, { mongo } from "mongoose";
import { compile } from "morgan";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "my city",
    },
  },
  { timestamps: true }
); //createdData ve UpdateData yı tutar mangoDB

export default mongoose.model("Job", JobSchema); //collection yani table
