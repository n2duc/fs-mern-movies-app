import responseHandller from "../handllers/response.handller.js";
import tmdbApi from "../tmdb/tmdb.api.js";

const personDetail = async (req, res) => {
    try {
        const { personId } = req.params;

        const person = await tmdbApi.personDetail({ personId });

        responseHandller.oke(res, person);
    } catch {
        responseHandller.error(res);
    }
};

const personMedias = async (req, res) => {
    try {
        const { personId } = req.params;

        const medias = await tmdbApi.personMedias({ personId });

        responseHandller.oke(res, medias);
    } catch {
        responseHandller.error(res);
    }
};

export default { personDetail, personMedias };
