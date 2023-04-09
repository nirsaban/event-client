import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, CssBaseline } from "@mui/material";
const theme = createTheme();

export const FlowLayout = ({ children, image }) => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        />
        {children}
      </Grid>
    </ThemeProvider>
  );
};
