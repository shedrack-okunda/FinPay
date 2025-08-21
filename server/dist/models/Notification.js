import mongoose, { Schema } from "mongoose";
const notificationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    type: {
        type: String,
        enum: ["transaction", "invoice", "security", "system"],
        required: true,
    },
    isRead: { type: Boolean, default: false },
    actionUrl: { type: String, trim: true },
}, {
    timestamps: true,
});
notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index({ isRead: 1 });
const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
//# sourceMappingURL=Notification.js.map