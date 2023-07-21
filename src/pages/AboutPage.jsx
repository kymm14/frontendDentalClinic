import { Container, Typography } from "@mui/material";
import React from "react";

export default function AboutPage() {
  return (
    <>
      <Container sx={{ mt: 5 }}>
        <Typography
          variant='h1'
          fontSize={40}
          align='center'
          fontWeight={400}
          gutterBottom>
          About
        </Typography>
      </Container>
    </>
  );
}
