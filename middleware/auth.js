import { getSession } from "next-auth/react";
import User from "../models/User";
import connectDB from "../lib/mongodb";

export const authorize = (roles = []) => async (req, res, next) => {
    await connectDB();
    const session = await getSession({ req });

    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const user = await User.findById(session.userId);
    if (!user || !roles.includes(user.role)) return res.status(403).json({ error: "Forbidden" });

    next();
};
