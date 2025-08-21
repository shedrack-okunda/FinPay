import Notification from "../models/Notification.js";
// Create a notification
export const createNotification = async (req, res, next) => {
    try {
        const notification = new Notification({
            ...req.body,
            userId: req.user.userId,
        });
        await notification.save();
        res.status(201).json({
            message: "Notification created successfully",
            notification,
        });
    }
    catch (error) {
        next(error);
    }
};
// Get all notifications for user
export const getNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find({
            userId: req.user.userId,
        }).sort({ createdAt: -1 });
        res.json({ notifications });
    }
    catch (error) {
        next(error);
    }
};
// Mark notification as read
export const markAsRead = async (req, res, next) => {
    try {
        const notification = await Notification.findOneAndUpdate({ _id: req.params.id, userId: req.user.userId }, { isRead: true }, { new: true });
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.json({
            message: "Notification marked as read",
            notification,
        });
    }
    catch (error) {
        next(error);
    }
};
// Delete notification
export const deleteNotification = async (req, res, next) => {
    try {
        const notification = await Notification.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId,
        });
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.json({ message: "Notification deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=notificationController.js.map