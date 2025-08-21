import Joi from "joi";
import User from "../models/User.js";
//  Get all users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    }
    catch (error) {
        next(error);
    }
};
//  Get single user by ID
export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        next(error);
    }
};
//  Get current logged-in user
export const getCurrentUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        next(error);
    }
};
// Joi schema for profile update
const updateProfileSchema = Joi.object({
    firstName: Joi.string().trim(),
    lastName: Joi.string().trim(),
    phone: Joi.string().trim(),
    dateOfBirth: Joi.date(),
    country: Joi.string().trim(),
    occupation: Joi.string().trim(),
    address: Joi.string().trim(),
    avatar: Joi.string().uri(),
});
// Update user profile
export const updateUserProfile = async (req, res, next) => {
    try {
        const { error, value } = updateProfileSchema.validate(req.body);
        if (error) {
            return res
                .status(400)
                .json({ message: error.details?.[0]?.message });
        }
        const updatedUser = await User.findByIdAndUpdate(req.user.userId, { $set: value }, { new: true, runValidators: true }).select("-password");
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            message: "Profile updated successfully",
            user: updatedUser,
        });
    }
    catch (error) {
        next(error);
    }
};
//  Delete user (self-delete for now)
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User account deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=userController.js.map