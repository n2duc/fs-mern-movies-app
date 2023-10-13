import { Favorite, FavoriteBorderOutlined, PlayArrow } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import CircularRate from "../components/common/CircularRate";
import Container from "../components/common/Container";
import ImageHeader from "../components/common/ImageHeader";
import CastSlide from "../components/common/CastSlide";

import uiConfigs from "../configs/ui.configs";
import tmdbConfigs from "../api/configs/tmdb.config";
import mediaApi from "../api/modules/media.api";
import favoriteApi from "../api/modules/favorite.api";

import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { addFavorite, removeFavorite } from "../redux/features/userSlice";

const MediaDetail = () => {
    const { mediaType, mediaId } = useParams();
    const { user, listFavorites } = useSelector((state) => state.user);

    const [media, setMedia] = useState();
    const [isFavorite, setIsFavorite] = useState(false);
    const [onRequest, setOnRequest] = useState(false);
    const [genres, setGenres] = useState([]);

    const dispatch = useDispatch();
    const videoRef = useRef();

    useEffect(() => {
        const getMedia = async () => {
            dispatch(setGlobalLoading(true));
            const { response, error } = await mediaApi.getDetail({ mediaType, mediaId });
            dispatch(setGlobalLoading(false));
            if (response) {
                setMedia(response);
                setIsFavorite(response.isFavorite);
                setGenres(response.genres.splice(0, 2));
            }
            if (error) toast.error(error.message);
        }
        getMedia();
    }, [mediaType, mediaId, dispatch]);

    const onFavoriteClick = async () => {
        if (!user) return dispatch(setAuthModalOpen(true));
        if (onRequest) return;
        if (isFavorite) {
            onRemoveFavorite();
            return;
        }
        setOnRequest(true);

        const body = {
            mediaId: media.id,
            mediaTitle: media.name || media.title,
            mediaType: mediaType,
            mediaPoster: media.poster_path,
            mediaRate: media.vote_average
        }
        const { response, error } = await favoriteApi.add(body);
        setOnRequest(false);

        if (error) toast.error(error.message);
        if (response) {
            dispatch(addFavorite(response));
            setIsFavorite(true);
            toast.success("Add favorite success")
        }
    }

    const onRemoveFavorite = async () => {
        if (onRequest) return;
        setOnRequest(true);

        const favorite = listFavorites.find((e) => e.mediaId.toString() === media.id.toString())

        const { response, error } = await favoriteApi.remove({ favoriteId: favorite.id })
        setOnRequest(false);

        if (error) toast.error(error.message);
        if (response) {
            dispatch(removeFavorite(favorite));
            setIsFavorite(false);
            toast.success("Remove favorite success");
        }
    }

    return (
        media ? (
            <>
                <ImageHeader imgPath={tmdbConfigs.backdropPath(media.backdrop_path || media.poster_path)} />
                <Box sx={{
                    color: "primary.contrastText",
                    ...uiConfigs.style.mainContent
                }}>
                    <Box sx={{
                        marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" }
                    }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: { md: "row", xs: "column" }
                        }}>
                            <Box sx={{
                                width: { xs: "70%", sm: "50%", md: "40%" },
                                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" }
                            }}>
                                <Box sx={{
                                    paddingTop: "140%",
                                    ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(media.poster_path || media.backdrop_path))
                                }} />
                            </Box>
                            <Box sx={{
                                width: { xs: "100%", md: "60%" },
                                color: "text.primary"
                            }}>
                                <Stack spacing={5}>
                                    <Typography
                                        variant="h4"
                                        fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                                        fontWeight="700"
                                        sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                                    >
                                        {`${media.title || media.name} ${mediaType === tmdbConfigs.mediaType.movide ? media.release_date.split("-")[0] : media.first_air_date.split("-")[0]}`}
                                    </Typography>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <CircularRate value={media.vote_average} />
                                        <Divider orientation="vertical" />
                                        {genres.map((genre, index) => (
                                            <Chip label={genre.name} variant="filled" color="primary" key={genre.name+index} />
                                        ))}
                                    </Stack>

                                    <Typography
                                        variant="body1"
                                        sx={{ ...uiConfigs.style.typoLines(5) }}
                                    >{media.overview}</Typography>
                                    <Stack direction="row" spacing={1}>
                                        <LoadingButton
                                            variant="text"
                                            sx={{
                                                width: "max-content",
                                                "& .MuiButton-starIcon": { marginRight: "0" }
                                            }}
                                            size="large"
                                            startIcon={isFavorite ? <Favorite /> : <FavoriteBorderOutlined />}
                                            loadingPosition="start"
                                            loading={onRequest}
                                            onClick={onFavoriteClick}
                                        />
                                        <Button
                                            variant="contained"
                                            sx={{ width: "max-content" }}
                                            size="large"
                                            startIcon={<PlayArrow />}
                                            onClick={() => videoRef.current.scrollIntoView()}
                                        >
                                            watch now
                                        </Button>
                                    </Stack>
                                    <Container header="Cast">
                                        <CastSlide casts={media.credits.cast}/>
                                    </Container>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </>
        ) : null
    )
};

export default MediaDetail