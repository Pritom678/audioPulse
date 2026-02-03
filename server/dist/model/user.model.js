import mongoose, { Document, Model, Schema } from "mongoose";
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
}, {
    timestamps: true,
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=user.model.js.map