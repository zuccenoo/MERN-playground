import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";

const validateObjectId = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ApiError(400, "Invalid expense ID"));
    }

    next();
};

export default validateObjectId;