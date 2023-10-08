import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";
import Footer from "../common/Footer";
import Topbar from "../common/Topbar";
import AuthModal from "../common/AuthModal";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import userApi from "../../api/modules/user.api";
import favoriteApi from "../../api/modules/favorite.api";
import { setUser, setListFavorites } from "../../redux/features/userSlice";

const MainLayout = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    
    // Get user with JWT
    useEffect(() => {
        const authUser = async () => {
            const { response, error } = await userApi.getInfo();
            if (response) dispatch(setUser(response))
            if (error) {
                dispatch(setUser(null));
                console.log("Error", error);
            }
        };
        authUser();
    }, [dispatch])
    // get favorite list if user is exist
    useEffect(() => {
        const getFavorites = async () => {
            const { response, error } = await favoriteApi.getList();
            if (response) dispatch(setListFavorites(response));
            if (error) toast.error(error.message);
        };
        if (user) getFavorites();
        if (!user) dispatch(setListFavorites([]));
    }, [user, dispatch]);

    return (
        <>
            {/* loading */}
            <GlobalLoading />
            {/* login modal */}
            <AuthModal />

            <Box display="flex" minHeight="100vh">
                <Topbar />
                {/* main */}
                <Box
                    component="main"
                    flexGrow={1}
                    overflow="hidden"
                    minHeight="100vh"
                >
                    <Outlet />
                </Box>
            </Box>

            {/* footer */}
            <Footer />
        </>
    );
};

export default MainLayout;