import connectDB from "../../../lib/mongodb";
import Tenant from "../../../models/Tenant";
import User from "../../../models/User";

export default async function handler(req, res) {
    if (req.method === "POST") {
        await connectDB();
        const { name, userId } = req.body;
        const tenant = await Tenant.create({ name, users: [userId] });

        await User.findByIdAndUpdate(userId, { $push: { tenants: tenant._id } });

        res.status(201).json(tenant);
    } else {
        res.status(405).end();
    }
}
