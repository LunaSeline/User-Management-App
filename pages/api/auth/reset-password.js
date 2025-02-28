import connectDB from "../../../lib/mongodb";
import User from "../../../models/User";
import crypto from "crypto";

export default async function handler(req, res) {
    if (req.method === "POST") {
        await connectDB();
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send email with reset link (Implement email service)
        res.json({ message: "Reset link sent!" });
    }
}
