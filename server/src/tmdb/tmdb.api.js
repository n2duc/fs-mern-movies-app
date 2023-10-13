import axiosClient from "../axios/axios.client.js";
import tmdbEndpoint from "./tmdb.endpoints.js";

const tmdbApi = {
    mediaList: async ({ mediaType, mediaCategory, page }) => await axiosClient.get(
        tmdbEndpoint.mediaList({ mediaType, mediaCategory, page })
    ),
    mediaDetail: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndpoint.mediaDetail({ mediaType, mediaId })
    ),
    mediaGenres: async ({ mediaType }) => await axiosClient.get(
        tmdbEndpoint.mediaGenres({ mediaType })
    ),
    mediaCredits: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndpoint.mediaCredits({ mediaType, mediaId })
    ),
    mediaVideos: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndpoint.mediaVideos({ mediaType, mediaId })
    ),
    mediaImages: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndpoint.mediaImages({ mediaType, mediaId })
    ),
    mediaRecommend: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndpoint.mediaRecommend({ mediaType, mediaId })
    ),
    mediaSearch: async ({ mediaType, query, page }) => await axiosClient.get(
        tmdbEndpoint.mediaRecommend({ mediaType, query, page })
    ),
    personDetail: async ({ personId }) => await axiosClient.get(
        tmdbEndpoint.personDetail({ personId })
    ),
    personMedias: async ({ personId }) => await axiosClient.get(
        tmdbEndpoint.personMedias({ personId })
    ),
}
export default tmdbApi;
