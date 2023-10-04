import { Box, Button, Paper, Stack } from "@mui/material"
import { Link } from "react-router-dom";
import Container from "./Container"
import Logo from "./Logo";
import menuConfigs from "../../configs/menu.configs";
const Footer = () => {
    return (
        <Container>
            <Paper square sx={{ backgroundImage: "unset", padding: "2rem" }}>
                <Stack
                    alignItems="center"
                    justifyContent="space-between"
                    direction={{ xs: "column", md: "row" }}
                    sx={{ height: "max-content" }}
                >
                    <Logo />
                    <Box>
                        {menuConfigs.main.map((item) => (
                            <Button 
                                key={item.state}
                                sx={{ color: "inherit" }}
                                component={Link}
                                to={item.path}
                            >
                                {item.display}
                            </Button>
                        ))}
                    </Box>
                </Stack>
            </Paper>
        </Container>
    )
}

export default Footer;