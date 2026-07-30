import { Request, Response, NextFunction } from "express";
import { AdminUser } from "../../models/admin-user.model";
import { AppError } from "../../middlewares/error.middleware";

export async function updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const allowed = ["name", "email"];
    const updates: Record<string, unknown> = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    if (req.body.currentPassword && req.body.newPassword) {
      const user = await AdminUser.findById(req.user?.userId);
      if (!user) throw new AppError("User not found", 404);

      const isMatch = await user.comparePassword(req.body.currentPassword);
      if (!isMatch) throw new AppError("Current password is incorrect", 400);

      user.password = req.body.newPassword;
      await user.save();
    }

    const updated = await AdminUser.findByIdAndUpdate(req.user?.userId, { $set: updates }, { new: true, runValidators: true }).select("-password");
    if (!updated) throw new AppError("User not found", 404);

    res.json({ user: { id: updated._id, name: updated.name, email: updated.email, role: updated.role } });
  } catch (err) {
    next(err);
  }
}
