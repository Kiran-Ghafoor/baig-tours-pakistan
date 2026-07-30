import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createGallerySchema } from "../../validators/gallery.validator";
import { listGallery, uploadImage, deleteImage } from "../../controllers/admin/gallery.controller";

const router = Router();

router.use(authenticate);

router.get("/", listGallery);
router.post("/", validate(createGallerySchema), uploadImage);
router.delete("/:id", deleteImage);

export default router;
