import React from "react";
import beans from "../../assets/beans.png";
import { Box, Grid, Typography, Container } from "@mui/material"; // تأكد من الاستيراد
import PhoneIcon from "@mui/icons-material/Phone"; // استيراد أيقونة الهاتف
import EmailIcon from "@mui/icons-material/Email"; // استيراد أيقونة البريد الإلكتروني
import LocationOnIcon from "@mui/icons-material/LocationOn"; // استيراد أيقونة الموقع

const ContactInfo = () => {
  // استبدال الخطوات بمحتوى معلومات الاتصال
  const contactInfo = [
    {
      icon: <PhoneIcon sx={{ fontSize: 30, color: "var(--primary)" }} />,
      title: "Phone",
      description: "+20 1123 523 055",
    },
    {
      icon: <EmailIcon sx={{ fontSize: 30, color: "var(--primary)" }} />,
      title: "Email",
      description: "SwirloCoffee@gmail.com",
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 30, color: "var(--primary)" }} />,
      title: "Address",
      description: "890 Street Smart Village, Egypt.",
    },
  ];

  return (
    <Box
      sx={{
        background: `linear-gradient(0deg, rgba(232, 241, 229, 0.69), rgba(255, 255, 255, 0.74)), url(${beans})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center", 
        overflow: "hidden",
        py: { xs: 8, md: 0 },
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Box sx={{ py: 10, textAlign: "center" }}>
          <Container maxWidth="md">
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 1,
                color: "var(--green-color)",
                fontSize: { xs: "2rem", md: "2.6rem" },
                fontFamily: "'Segoe Script', cursive",
              }}
            >
              Contact Us
            </Typography>

            {/* line -----icone ------line----- */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                mb: 5,
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 4,
                  backgroundColor: "var(--primary)",
                  borderRadius: "50px 0 0 50px",
                }}
              />
              <PhoneIcon sx={{ color: "var(--primary)", fontSize: 30 }} />
              <Box
                sx={{
                  width: 50,
                  height: 4,
                  backgroundColor: "var(--primary)",
                  borderRadius: "0 50px 50px 0",
                }}
              />
            </Box>
               {/* line -----icone ------line----- */}

            <Grid container spacing={4}>
              {contactInfo.map((info, index) => (
                <Grid item xs={12} key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      justifyContent: "center", 
                      textAlign: "center", 
                    }}
                  >
                    {info.icon}
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "var(--green-color)" }}
                      >
                        {info.title}
                      </Typography>
                      <Typography variant="body1" color="text.primary">
                        {info.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Grid>
    </Box>
  );
};

export default ContactInfo;
