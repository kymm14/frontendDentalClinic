import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function AboutPage() {
  return (
    <>
      <Container
        sx={{
          mt: 5,
          pb: 4,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}>
        <Typography
          variant='h1'
          fontSize={35}
          align='center'
          fontWeight={400}
          gutterBottom>
          About Us
        </Typography>
        <Box>
          <Typography
            variant='h2'
            fontSize={20}
            align='center'
            textAlign={"justify"}
            gutterBottom>
            At Happy Smile, our goal is to provide our patients with an
            exceptional dental experience that leaves them feeling comfortable,
            confident, and most importantly, with a happy smile on their faces.
            We are a modern and dedicated dental clinic, committed to the
            comprehensive care of oral health and dental aesthetics.
          </Typography>
          <Typography
            variant='h1'
            fontSize={35}
            align='center'
            fontWeight={400}
            gutterBottom
            sx={{ mt: 3 }}>
            Our Mission
          </Typography>
          <Typography
            variant='h2'
            fontSize={20}
            align='center'
            textAlign={"justify"}
            gutterBottom>
            At Happy Smile, our mission is to offer a holistic and personalized
            approach to dental care. We believe that each smile is unique and
            deserves individualized care. Our highly trained team of dental
            professionals strive to provide the highest quality services using
            cutting-edge technology and evidence-based practices.
          </Typography>
          <Typography
            variant='h1'
            fontSize={35}
            align='center'
            fontWeight={400}
            gutterBottom
            sx={{ mt: 3 }}>
            A Warm and Cozy Environment
          </Typography>
          <Typography
            variant='h2'
            fontSize={20}
            align='center'
            textAlign={"justify"}
            gutterBottom>
            We know that visiting a dental clinic can generate anxiety in some
            people. At Happy Smile, we strive to create a warm and welcoming
            environment so that our patients feel relaxed and confident during
            their visit. Our comfortable facilities and friendly staff are here
            to provide close, compassionate care at all times.
          </Typography>
          <Typography
            variant='h1'
            fontSize={35}
            align='center'
            fontWeight={400}
            gutterBottom
            sx={{ mt: 3 }}>
            Community and Social Responsibility
          </Typography>
          <Typography
            variant='h2'
            fontSize={20}
            align='center'
            textAlign={"justify"}
            gutterBottom>
            At Happy Smile, we not only care about our patients, but our
            community as well. We actively participate in social responsibility
            programs and local events to promote the importance of dental care
            and contribute to the general well-being of the people around us.
          </Typography>
          <Typography
            variant='h1'
            fontSize={35}
            align='center'
            fontWeight={400}
            gutterBottom
            sx={{ mt: 3 }}>
            Come meet us!
          </Typography>
        </Box>
      </Container>
    </>
  );
}
