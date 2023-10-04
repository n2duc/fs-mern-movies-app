import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";
import Footer from "../common/Footer";
import Topbar from "../common/Topbar";
import AuthModal from "../common/AuthModal";

const MainLayout = () => {
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
