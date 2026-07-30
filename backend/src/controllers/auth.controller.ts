import { Request, Response, NextFunction } from "express";
import { AdminUser } from "../models/admin-user.model";
import { signToken } from "../utils/auth";
import { AppError } from "../middlewares/error.middleware";

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;

    const user = await AdminUser.findOne({ email: email.toLowerCase() });
    if (!user) throw new AppError("Invalid email or password", 401);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new AppError("Invalid email or password", 401);

    const token = signToken({ userId: user._id.toString(), email: user.email, role: user.role });

    res.cookie("baig-tours-auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
}

export async function logout(_req: Request, res: Response): Promise<void> {
  res.clearCookie("baig-tours-auth");
  res.json({ message: "Logged out" });
}

export async function me(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await AdminUser.findById(req.user?.userId).select("-password");
    if (!user) throw new AppError("User not found", 404);

    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
}
