import Beneficiary from "../models/Beneficiary.js";
// Create a beneficiary
export const createBeneficiary = async (req, res, next) => {
    try {
        const beneficiary = new Beneficiary({
            ...req.body,
            userId: req.user.userId,
        });
        await beneficiary.save();
        res.status(201).json({
            message: "Beneficiary created successfully",
            beneficiary,
        });
    }
    catch (error) {
        next(error);
    }
};
// Get all user beneficiaries
export const getBeneficiaries = async (req, res, next) => {
    try {
        const beneficiaries = await Beneficiary.find({
            userId: req.user.userId,
        });
        res.json({ beneficiaries });
    }
    catch (error) {
        next(error);
    }
};
// Get a single beneficiary
export const getBeneficiaryById = async (req, res, next) => {
    try {
        const beneficiary = await Beneficiary.findOne({
            _id: req.params.id,
            userId: req.user.userId,
        });
        if (!beneficiary) {
            return res.status(404).json({ message: "Beneficiary not found" });
        }
        res.json(beneficiary);
    }
    catch (error) {
        next(error);
    }
};
// Update beneficiary
export const updateBeneficiary = async (req, res, next) => {
    try {
        const beneficiary = await Beneficiary.findOneAndUpdate({ _id: req.params.id, userId: req.user.userId }, req.body, { new: true });
        if (!beneficiary) {
            return res.status(404).json({ message: "Beneficiary not found" });
        }
        res.json({
            message: "Beneficiary updated successfully",
            beneficiary,
        });
    }
    catch (error) {
        next(error);
    }
};
// Delete beneficiary
export const deleteBeneficiary = async (req, res, next) => {
    try {
        const beneficiary = await Beneficiary.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId,
        });
        if (!beneficiary) {
            return res.status(404).json({ message: "Beneficiary not found" });
        }
        res.json({ message: "Beneficiary deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=beneficiaryController.js.map