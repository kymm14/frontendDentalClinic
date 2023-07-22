import React from "react";
import { Box } from "@mui/material";
import "./HomePage.scss";

export default function HomePage() {
  return (
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
        <img src='public\images\logo-removebg-preview.png' alt='' srcset='' />
      </Box>
    </div>
  );
}
