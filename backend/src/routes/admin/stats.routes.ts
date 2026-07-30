import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { dashboard, revenueStats, bookingStats, contactStats, subscriberStats } from "../../controllers/admin/stats.controller";

const router = Router();

router.use(authenticate);

router.get("/", dashboard);
router.get("/revenue", revenueStats);
router.get("/bookings", bookingStats);
router.get("/contacts", contactStats);
router.get("/subscribers", subscriberStats);

export default router;
