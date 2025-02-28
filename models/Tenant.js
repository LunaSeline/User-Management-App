import mongoose from "mongoose";

const TenantSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

export default mongoose.models.Tenant || mongoose.model("Tenant", TenantSchema);
