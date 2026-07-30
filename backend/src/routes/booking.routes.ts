import { Router } from "express";
import { createBooking, getBooking } from "../controllers/booking.controller";
import { validate } from "../middlewares/validate.middleware";
import { createBookingSchema } from "../validators/booking.validator";

const router = Router();

router.post("/", validate(createBookingSchema), createBooking);
router.get("/:id", getBooking);

export default router;
