import { Router } from "express";

const router = Router();

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

// router.get('/',getAllJobs)   //böyle tek tek de kullanabiliriz, altta komple yapı kullandık

// router.post("/", createJob);

router.route("/").get(getAllJobs).post(validateJobInput, createJob); //validateJobInput kısmı create ve update icin uygulanacak
router //validateIdParam id kullanan route lar icn id ye özel validate islemi
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(validateJobInput, validateIdParam, updateJob)
  .delete(validateIdParam, deleteJob);

export default router;
