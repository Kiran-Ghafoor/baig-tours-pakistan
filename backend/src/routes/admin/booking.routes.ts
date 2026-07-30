import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { updateBookingSchema } from "../../validators/booking.validator";
import { listBookings, getBooking, updateBooking, deleteBooking, exportBookings } from "../../controllers/admin/booking.controller";

const router = Router();

router.use(authenticate);

router.get("/", listBookings);
router.get("/export", exportBookings);
router.get("/:id", getBooking);
router.put("/:id", validate(updateBookingSchema), updateBooking);
router.delete("/:id", deleteBooking);

export default router;
