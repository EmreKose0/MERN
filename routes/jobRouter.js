import { Router } from "express";

const router = Router();

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

// router.get('/',getAllJobs)   //böyle tek tek de kullanabiliriz, altta komple yapı kullandık

// router.post("/", createJob);

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob); //validateJobInput kısmı create ve update icin uygulanacak
//CheckForTestUser, test user ise bu kısmı göstermez

router.route("/stats").get(showStats);

router //validateIdParam id kullanan route lar icn id ye özel validate islemi
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(checkForTestUser, validateJobInput, validateIdParam, updateJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
