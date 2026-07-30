import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { updateProfileSchema } from "../../validators/profile.validator";
import { updateProfile } from "../../controllers/admin/profile.controller";

const router = Router();

router.use(authenticate);

router.put("/", validate(updateProfileSchema), updateProfile);

export default router;
