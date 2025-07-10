"use client";

import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import AddBg from "./components/AddBg";
import CcsLogo from "../_components/CcsLogo";
import { useRouter } from "next/navigation";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
    background: {
      default: "#000000",
      paper: "transparent",
    },
    text: {
      primary: "#ffffff",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ffffff",
              borderWidth: "2px",
            },
            "&:hover fieldset": {
              borderColor: "#dc2626",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#dc2626",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: "0.875rem",
            letterSpacing: "0.05em",
          },
          "& .MuiOutlinedInput-input": {
            color: "#ffffff",
            height: "1.5rem",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderWidth: "2px",
          fontWeight: "bold",
          letterSpacing: "0.05em",
          height: "3rem",
          "&:hover": {
            borderWidth: "2px",
          },
        },
      },
    },
  },
});

export default function CreateTeamPage() {
  const router = useRouter();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* <div className="absolute inset-0 opacity-30">
          <svg
            className="w-full h-full"
            viewBox="0 0 800 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
                  d="M20 20h60v20h-20v20h-20v20h-20v-60z M60 60h20v20h-20v-20z M40 40h20v-20h20v20h-20v20h-20v-20z"
                  stroke="#dc2626"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M0 50h20v20h20v-20h20v20h20v-20h20"
                  stroke="#dc2626"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M50 0v20h20v20h-20v20h20v20h-20v20"
                  stroke="#dc2626"
                  strokeWidth="2"
                  fill="none"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </div> */}
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

        <Box className="relative z-10  pt-1 md:pt-1 flex items-center justify-between p-4 md:p-6">
          <div className="flex items-center space-x-3">
            <CcsLogo />
          </div>

          <Button
            sx={{ border: "1px solid white", borderRadius: "8px" }}
            className="  text-xs md:text-sm px-3 md:px-4"
          >
            <Typography
              sx={{ fontFamily: "GothamXNarrow", fontWeight: "bold" }}
            >
              YOUR TEAM
            </Typography>
          </Button>
        </Box>

        <Container maxWidth="sm" className="relative z-10 px-4 md:px-6">
          <Box className="flex flex-col items-center justify-center  space-y-6 md:space-y-8">
            <Typography
              variant="h2"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-center tracking-wider mb-4 md:mb-8"
              sx={{ fontFamily: "megarok", fontSize: "80px" }}
            >
              Create a team
            </Typography>

            <Paper
              elevation={0}
              className="w-full border-4 border-white bg-transparent p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6"
            >
              <Box className="space-y-4 md:space-y-6">
                <Typography
                  className="sm:text-2xl md:text-8xl"
                  sx={{
                    fontFamily: "GothamXNarrow",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Name
                </Typography>
                <TextField fullWidth variant="outlined" className="w-full" />
                <Typography
                  sx={{
                    fontFamily: "GothamXNarrow",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Email
                </Typography>

                <TextField
                  fullWidth
                  type="email"
                  variant="outlined"
                  className="w-full"
                />
                <Typography
                  sx={{
                    fontFamily: "GothamXNarrow",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Phone No
                </Typography>

                <TextField
                  fullWidth
                  type="tel"
                  variant="outlined"
                  className="w-full"
                />
                <Typography
                  sx={{
                    fontFamily: "GothamXNarrow",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Team Name
                </Typography>

                <TextField fullWidth variant="outlined" className="w-full" />

                <Box className="pt-2 md:pt-4">
                  <Button
                    onClick={() => router.push("/ThankYou")}
                    fullWidth
                    variant="outlined"
                    className="w-full bg-transparent border-2 border-white text-white hover:bg-red-600 hover:border-red-600 font-bold tracking-wide"
                  >
                    SUBMIT
                  </Button>
                </Box>
              </Box>
            </Paper>

            {/* <Box className="w-full space-y-3 md:space-y-4">
              <Typography
                variant="h4"
                className="text-lg md:text-xl font-bold text-center tracking-wider"
              >
                TEAM CODE
              </Typography>
              <Paper
                elevation={0}
                className="border-2 border-white bg-transparent p-3 md:p-4"
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter team code"
                  className="w-full"
                  InputProps={{
                    style: { textAlign: "center" },
                  }}
                />
              </Paper>
            </Box> */}
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
