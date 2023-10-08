import { Box, Typography, CircularProgress } from "@mui/material";

const CircularRate = ({ value }) => {
    return (
        <Box sx={{
            position: "relative",
            display: "inline-block",
            width: "max-content",
        }}>
            <CircularProgress
                variant="determinate"
                value={value * 10}
                color="success"
            />
            <Box sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Typography
                    component="div"
                    variant="caption"
                    fontWeight="700"
                    sx={{ marginTop: "-5px" }}
                >
                    {Math.floor(value * 10) / 10}
                </Typography>
            </Box>
        </Box>
    );
};

export default CircularRate;