import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { listSubscribers, deleteSubscriber } from "../../controllers/admin/subscriber.controller";

const router = Router();

router.use(authenticate);

router.get("/", listSubscribers);
router.delete("/:id", deleteSubscriber);

export default router;
