import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createTourSchema, updateTourSchema } from "../../validators/tour.validator";
import { listTours, createTour, updateTour, deleteTour } from "../../controllers/admin/tour.controller";

const router = Router();

router.use(authenticate);

router.get("/", listTours);
router.post("/", validate(createTourSchema), createTour);
router.put("/:id", validate(updateTourSchema), updateTour);
router.delete("/:id", deleteTour);

export default router;
