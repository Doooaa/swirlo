import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";

const AboutBg = ({ title = "About", subtitle = "Home - About", backgroundImage }) => {
  return (
    <Box
      sx={{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(57, 27, 3, 0.5)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "45vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}>
      <Container>
        <Grid
          container
          spacing={{ xs: 0, md: 4 }}
          direction="column"
          sx={{
            justifyContent: "center",
            alignItems: "center",
          
          }}>
          <Grid
            item
            xs={12}
            sx={{
              textAlign: "center",
            }}>
            <Typography
              variant="h4"
              color="white"
              sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
              <strong>{title}</strong>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              textAlign: "center",
            }}>
            <Typography
              variant="body1"
              color="white"
              sx={{
                fontWeight: "700",
                fontSize: { xs: "1.1rem", md: "1.3rem" },
              }}>
              {subtitle}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutBg;
