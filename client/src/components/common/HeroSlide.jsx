import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Chip, Divider, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import { toast } from "react-toastify";

import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { routesGen } from "../../routes/routes";
import uiConfigs from "../../configs/ui.configs";

import CircularRate from "./CircularRate";

import tmdbConfigs from "../../api/configs/tmdb.config";
import genreApi from "../../api/modules/genre.api";
import mediaApi from "../../api/modules/media.api";

const HeroSlide = ({ mediaType, mediaCategory }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]); // The loai

    useEffect(() => {
        const getMedias = async () => {
            const { response, error } = await mediaApi.getList({
                mediaType,
                mediaCategory,
                page: 1
            });
            if (response) setMovies(response.results);
            if (error) toast.error(error.message);
            dispatch(setGlobalLoading(false));
        };

        const getGenres = async () => {
            dispatch(setGlobalLoading(true));
            const { response, error } = await genreApi.getList({ mediaType });
            if (response) {
                setGenres(response.genres);
                getMedias();
            }
            if (error) {
                toast.error(error.message);
                dispatch(setGlobalLoading(false));
            }
        };

        getGenres();
    }, [dispatch, mediaType, mediaCategory])
    

    return (
        <Box sx={{
            position: "relative",
            color: "primary.contrastText",
            "&::before": {
                content: '""',
                position: "absolute",
                width: "100%",
                height: "30%",
                bottom: 0,
                left: 0,
                zIndex: 2,
                pointerEvents: "none",
                ...uiConfigs.style.gradientBgImage[theme.palette.mode]
            }
        }}>
            <Swiper
                grabCursor={true}
                loop={true}
                style={{ width: "100%", height: "max-content" }}
                modules={[Autoplay]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
            >
                {movies.map((movie, index) => (
                    <SwiperSlide key={index}>
                        <Box sx={{
                            paddingTop: {
                                xs: "130%",
                                sm: "80%",
                                md: "60%",
                                lg: "45%"
                            },
                            backgroundPosition: "top",
                            backgroundSize: "cover",
                            backgroundImage: `url(${tmdbConfigs.backdropPath(movie.backdrop_path || movie.poster_path)})`
                        }}></Box>
                        <Box sx={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            ...uiConfigs.style.horizontalGradientBgImage[theme.palette.mode]
                        }}></Box>
                        <Box sx={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            paddingX: { sm: "10px", md: "5rem", lg: "10rem" }
                        }}>
                            <Box sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                paddingX: "30px",
                                color: "text.primary",
                                width: { sm: "unset", md: "30%", lg: "40%" }
                            }}>
                                <Stack spacing={4} direction="column">
                                    <Typography 
                                        sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                                        variant="h4"
                                        fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                                        fontWeight="700"
                                    >
                                        {movie.title || movie.name}
                                    </Typography>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <CircularRate value={movie.vote_average} />
                                        <Divider orientation="vertical" />
                                        {[...movie.genre_ids].splice(0, 2).map((genreId, index) => (
                                            <Chip
                                                key={index}
                                                variant="filled"
                                                color="primary"
                                                label={genres.find(e => e.id === genreId) && genres.find(e => e.id === genreId).name}
                                            />
                                        ))}
                                    </Stack>
                                    <Typography variant="body1" sx={{...uiConfigs.style.typoLines(3)}}>
                                        {movie.overview}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        startIcon={<PlayArrowIcon />}
                                        LinkComponent={Link}
                                        to={routesGen.mediaDetail(mediaType, movie.id)}
                                        sx={{ width: "max-content" }}
                                    >
                                        watch now
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    )
}

export default HeroSlide