import responseHandller from "../handllers/response.handller.js";
import reviewModel from "../models/review.model.js";

const create = async (req, res) => {
    try {
        const { movieId } = req.params;

        const review = new reviewModel({
            user: req.user.id,
            movieId,
            ...req.body
        });
        await review.save();

        responseHandller.created(res, {
            ...review._doc,
            id: review.id,
            user: req.user
        });
    } catch {
        responseHandller.error(res);
    }
};

const remove = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const review = await reviewModel.findOne({
            _id: reviewId,
            user: req.user.id
        });

        if (!review) return responseHandller.notfound(res);
        await review.remove();

        responseHandller.oke(res);
    } catch {
        responseHandller.error(res);
    }
};

const getReviewsOfUser = async (req, res) => {
    try {
        const reviews = await reviewModel.find({
            user: req.user.id
        }).sort("-createdAt");
        responseHandller.oke(res, reviews);
    } catch {
        responseHandller.error(res);
    }
};

export default { create, remove, getReviewsOfUser };