import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import userApi from "../../api/modules/user.api";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setUser } from "../../redux/features/userSlice";

const SignupForm = ({ switchAuthState }) => {
    const dispatch = useDispatch();

    const [isRegisterRequest, setIsRegisterRequest] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const signupForm = useFormik({
        initialValues: {
            username: "",
            displayName: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().min(8, "username minium 8 characters").required("username is required"),
            displayName: Yup.string().min(8, "displayName minium 8 characters").required("displayName is required"),
            password: Yup.string().min(8, "password minium 8 characters").required("password is required"),
            confirmPassword: Yup.string().min(8, "confirmPassword minium 8 characters").oneOf([Yup.ref("password")], "confirmPassword not match").required("confirmPassword is required"),
        }),
        onSubmit: async (values) => {
            setErrorMessage(undefined);
            setIsRegisterRequest(true);
            const { response, error } = await userApi.signup(values);
            setIsRegisterRequest(false);

            if (response) {
                signupForm.resetForm();
                dispatch(setUser(response));
                dispatch(setAuthModalOpen(false));
                toast.success("Sign up success!");
            }
            if (error) setErrorMessage(error.message);
        }
    });

    return (
        <Box component="form" onSubmit={signupForm.handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    type="text"
                    placeholder="Username"
                    name="username"
                    fullWidth
                    value={signupForm.values.username}
                    onChange={signupForm.handleChange}
                    color="success"
                    error={signupForm.touched.username && signupForm.errors.username !== undefined}
                    helperText={signupForm.touched.username && signupForm.errors.username}
                />
                <TextField
                    type="text"
                    placeholder="Display name"
                    name="displayName"
                    fullWidth
                    value={signupForm.values.displayName}
                    onChange={signupForm.handleChange}
                    color="success"
                    error={signupForm.touched.displayName && signupForm.errors.displayName !== undefined}
                    helperText={signupForm.touched.displayName && signupForm.errors.displayName}
                />
                <TextField
                    type="password"
                    placeholder="Password"
                    name="password"
                    fullWidth
                    value={signupForm.values.password}
                    onChange={signupForm.handleChange}
                    color="success"
                    error={signupForm.touched.password && signupForm.errors.password !== undefined}
                    helperText={signupForm.touched.password && signupForm.errors.password}
                />
                <TextField
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    fullWidth
                    value={signupForm.values.confirmPassword}
                    onChange={signupForm.handleChange}
                    color="success"
                    error={signupForm.touched.confirmPassword && signupForm.errors.confirmPassword !== undefined}
                    helperText={signupForm.touched.confirmPassword && signupForm.errors.confirmPassword}
                />
            </Stack>
            <LoadingButton
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{ marginTop: 4 }}
                loading={isRegisterRequest}
            >
                sign up
            </LoadingButton>
            <Button size="large" fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>sign in</Button>

            {errorMessage && (
                <Box sx={{ marginTop: 2 }}>
                    <Alert severity="error" variant="outlined">{errorMessage}</Alert>
                </Box>
            )}
        </Box>
    )
};

export default SignupForm;
