"use client";

import { Box, Container, Typography, Paper, Button } from "@mui/material";
import CcsLogo from "../_components/CcsLogo";

export default function ThankYouPage() {
  return (
    <Box className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Pattern */}
      <Box className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern
              id="circuit"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M20 20h60v20h-20v20h-20v20h-20z"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
              />
              <path
                d="M80 40h-20v20h20v20h-40v-20h-20"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </Box>

      {/* Main Content */}
      <Container maxWidth="sm" className="relative z-10">
        <Box display="flex" justifyContent="center" mb={8}>
          <CcsLogo />
        </Box>

        <Box className="text-center space-y-6 md:space-y-8">
          <Typography
            className="text-white text-3xl md:text-5xl font-bold tracking-wider"
            sx={{ fontFamily: "monospace" }}
          >
            THANK YOU FOR REGISTERING
          </Typography>

          <Typography
            className="text-white text-base md:text-lg tracking-wide"
            sx={{ fontFamily: "monospace" }}
          >
            Your team has been successfully created.
          </Typography>

          <Paper
            elevation={0}
            className="mx-auto border-2 border-red-600 px-6 py-4 bg-black"
            sx={{
              maxWidth: "300px",
              borderRadius: "8px",
              boxShadow: "0px 0px 6px 3px #dc2626",
            }}
          >
            <Typography
              variant="h6"
              className="text-red-500 font-bold text-center"
              sx={{ fontFamily: "monospace" }}
            >
              YOUR TEAM CODE
            </Typography>
            <Typography
              className="text-white text-2xl md:text-3xl font-bold tracking-wider mt-2"
              sx={{ fontFamily: "monospace" }}
            >
              ABC123
            </Typography>
          </Paper>

          <Button
            variant="outlined"
            className="text-white"
            sx={{
              mt: 4,
              borderColor: "white",
              fontFamily: "monospace",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#dc2626",
                borderColor: "#dc2626",
              },
            }}
            href="/team-dashboard"
          >
            GO TO DASHBOARD
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
