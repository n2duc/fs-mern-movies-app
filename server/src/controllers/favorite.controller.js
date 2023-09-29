import responseHandller from "../handllers/response.handller.js";
import favoriteModel from "../models/favorite.model.js";

const addFavorite = async (req, res) => {
    try {
        const isFavorite = await favoriteModel.findOne({
            user: req.user.id,
            mediaId: req.body.mediaId
        });

        if (isFavorite) return responseHandller.oke(res, isFavorite);

        const favorite = new favoriteModel({
            ...req.body,
            user: req.user.id
        });
        await favorite.save();
        responseHandller.created(res, favorite);
    } catch {
        responseHandller.error(res);
    }
};

const removeFavorite = async (req, res) => {
    try {
        const { favoriteId } = req.params;

        const favorite = await favoriteModel.findOne({
            user: req.user.id,
            _id: favoriteId
        });

        if (!favorite) return responseHandller.notfound(res);
        await favorite.remove();
        responseHandller.oke(res);
    } catch {
        responseHandller.error(res);
    }
};

const getFavoritesOfUser = async (req, res) => {
    try {
        const favorite = await favoriteModel.find({ user: req.user.id }).sort("-createdAt");

        responseHandller.oke(res, favorite);
    } catch {
        responseHandller.error(res);
    }
};

export default { addFavorite, removeFavorite, getFavoritesOfUser };