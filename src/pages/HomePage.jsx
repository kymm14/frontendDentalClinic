import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import "./HomePage.scss";
import LoginPage from "./LoginPage";
import { NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <div className='HomePage'>
      <div className='backgroundHome'></div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          img: {
            xs: { display: "none" },
            sm: { width: "90%", display: "block" },
            md: { width: "50%" },
            lg: { width: "50%" },
          },
        }}>
        <img
          src='public\images\logo-removebg-preview.png'
          alt=''
          srcset=''
          width={"50%"}
        />
      </Box>
      <Container className='TextPhoto'>
        <Grid container spacing={1}>
          <Grid item sm={8}>
            <Box sx={{ mt: 4 }}>
              <Typography
                className='welcome'
                variant='h1'
                align='left'
                fontWeight={400}
                gutterBottom>
                ¡Bienvenido/a a nuestra clínica dental! Nos complace presentarte
                un espacio donde la salud bucodental es nuestra principal
                prioridad. En Happy Smile, entendemos que una sonrisa radiante y
                saludable puede marcar la diferencia en tu vida y tu confianza
                personal.
              </Typography>
            </Box>
            <NavLink style={{ textDecoration: "none" }} to='/login'>
              <Button
                variant='contained'
                size='medium'
                sx={{
                  mt: 1,
                  color: "white",
                  bgcolor: "primary.dark",
                }}>
                Create Appointment
              </Button>
            </NavLink>
          </Grid>
          <Grid item sm={4}>
            <img src='/images/doctor.jpg' alt='' width={"100%"} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
