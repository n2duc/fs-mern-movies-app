import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

export const themeModes = {
    dark: "dark",
    light: "light"
};

const themeConfigs = {
    custom: ({ mode }) => {
        const customPalette = mode === themeModes.dark ? {
            primary: {
                main: "#006eff",
                contrastText: "#FFFFFF"
            },
            secondary: {
                main: "#3685f4",
                contrastText: "#FFFFFF"
            },
            background: {
                default: "#000000",
                paper: "#131313"
            }
        } : {
            primary: {
                main: "#006eff",
            },
            secondary: {
                main: "#3685f4",
            },
            background: {
                default: colors.grey["100"],
            }
        };

        return createTheme({
            palette: {
                mode,
                ...customPalette
            },
            components: {
                MuiButton: {
                    defaultProps: { disableElevation: true }
                }
            }
        })
    }
};

export default themeConfigs;