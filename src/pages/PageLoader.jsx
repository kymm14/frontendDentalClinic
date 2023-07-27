import React from "react";
import { RotateLoader } from "react-spinners";

export default function PageLoader() {
  return (
    <RotateLoader
      className='spinnerLoading'
      color='#1976d2'
      cssOverride={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
