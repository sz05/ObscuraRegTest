import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ShowPasswordBox = ({ password }: { password: string }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "red",
        padding: "8px 12px",
        borderRadius: "8px",
        gap: 1,
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: "black",
          fontFamily: "monospace",
          letterSpacing: 1,
        }}
      >
        {showPassword ? password : "•".repeat(password.length)}
      </Typography>
      <IconButton
        onClick={() => setShowPassword((prev) => !prev)}
        sx={{ color: "black" }}
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </Box>
  );
};

export default ShowPasswordBox;
