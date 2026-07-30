import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createReviewSchema, updateReviewSchema } from "../../validators/review.validator";
import { listReviews, createReview, updateReview, deleteReview } from "../../controllers/admin/review.controller";

const router = Router();

router.use(authenticate);

router.get("/", listReviews);
router.post("/", validate(createReviewSchema), createReview);
router.put("/:id", validate(updateReviewSchema), updateReview);
router.delete("/:id", deleteReview);

export default router;
