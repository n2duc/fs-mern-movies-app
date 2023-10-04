import { Modal, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import Logo from "./Logo";
import SignupForm from "./SignupForm";
import SigninForm from "./SigninForm";

const actionState = {
    signin: "signin",
    signup: "signup"
}

const AuthModal = () => {
    const { authModalOpen } = useSelector((state) => state.authModal);

    const dispatch = useDispatch();
    const [action, setAction] = useState(actionState.signin);

    useEffect(() => {
        if(authModalOpen) setAction(actionState.signup);
    }, [authModalOpen])

    const handleClose = () => dispatch(setAuthModalOpen(false));

    const switchAuthState = (state) => setAction(state);

    return (
        <Modal open={authModalOpen} onClose={handleClose}>
            <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                maxWidth: "600px",
                padding: 4,
                outline: "none"
            }}>
                <Box sx={{ padding: 4, boxShadow: 24, backgroundColor: "background.paper", borderRadius: "6px" }}>
                    <Box sx={{ marginBottom: "2rem", textAlign: "center" }}>
                        <Logo />
                    </Box>

                    {action === actionState.signin && <SignupForm switchAuthState={() => switchAuthState(actionState.signup)} />}
                    {action === actionState.signup && <SigninForm switchAuthState={() => switchAuthState(actionState.signin)} />}

                </Box>
            </Box>
        </Modal>
    );
};

export default AuthModal;
