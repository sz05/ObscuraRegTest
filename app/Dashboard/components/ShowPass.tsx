import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ShowPasswordBox = ({
  password,
  username,
}: {
  username: string;
  password: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
        Username: {username}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "black",
          fontFamily: "monospace",
          letterSpacing: 1,
        }}
      >
        {showPassword ? `password: ${password}` : null}
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
