import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createBlogSchema, updateBlogSchema } from "../../validators/blog.validator";
import { listBlogs, createBlog, updateBlog, deleteBlog } from "../../controllers/admin/blog.controller";

const router = Router();

router.use(authenticate);

router.get("/", listBlogs);
router.post("/", validate(createBlogSchema), createBlog);
router.put("/:id", validate(updateBlogSchema), updateBlog);
router.delete("/:id", deleteBlog);

export default router;
