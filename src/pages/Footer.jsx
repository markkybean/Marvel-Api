import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {


  return (
    <Box
      sx={{ textAlign: "center", padding: "16px", backgroundColor: "#f1f1f1" }}
    >
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Data provided by Marvel. © 2025 MARVEL
      </Typography>
    </Box>
  );
};


