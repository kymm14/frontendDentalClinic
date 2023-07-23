import React from "react";
import { Box, Container, Typography } from "@mui/material";
import "./HomePage.scss";
import { useSelector } from "react-redux";

export default function HomePage() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userName = useSelector((state) => state.auth.userInfo.name);

  return (
    <>
      {!isLoggedIn && (
        <div className='HomePage'>
          <div className='backgroundHome'></div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              img: {
                xs: { width: "80%", marginTop: 150 },
                sm: { width: "40%", marginTop: 150 },
                md: { width: "55%" },
                lg: { width: "25%" },
              },
            }}>
            <img
              src='public\images\logo-removebg-preview.png'
              alt=''
              srcset=''
            />
          </Box>
        </div>
      )}

      {isLoggedIn && (
        <Container
          sx={{
            mt: 8,
            pb: 4,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}>
          <Box>
            <Typography
              variant='h1'
              fontSize={30}
              align='center'
              fontWeight={400}
              gutterBottom>
              Hello, {userName}.
            </Typography>

            <Box
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                img: {
                  xs: { width: "50%" },
                  sm: { width: "40%" },
                  md: { width: "30%" },
                  lg: { width: "25%" },
                },
              }}>
              <img src='public\images\diente.png' alt='' width={"20%"} />
            </Box>
            <Box sx={{ mt: 5 }}>
              <Typography
                variant='h2'
                fontSize={25}
                align='center'
                gutterBottom>
                You can manage your appointments through your profile, in the
                Appointments section.
              </Typography>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}
