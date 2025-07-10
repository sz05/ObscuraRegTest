"use client";

import Bg from "./components/Bg";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CcsLogo from "../_components/CcsLogo";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Bg />

      <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10">
        <CcsLogo />
      </div>

      <div className="flex h-full w-full">
        <div className="hidden md:flex flex-1" />

        <div className="flex flex-col justify-between md:justify-center items-center w-full md:max-w-md px-4 md:pr-36 py-6">
          <h1 className="text-7xl md:text-9xl md:mb-20 font-bold tracking-widest font-megarok text-center mt-28 md:mt-0">
            REGISTER NOW
          </h1>

          <div className="flex flex-col items-center space-y-12 w-full mb-4 md:mb-0">
            <Button
              onClick={() => router.push("/Join")}
              sx={{
                bgcolor: "black",
                width: "100%",
                height: { xs: "60px", sm: "65px", md: "80px" },
                maxWidth: { xs: "320px", md: "400px" },
                boxShadow: {
                  xs: "0px 0px 3px 3px #FFFFFFCF",
                  md: "0px 0px 10px 10px #FFFFFFCF",
                },
                borderRadius: { xs: "20px", md: "27px" },
              }}
            >
              <Typography
                sx={{
                  textTransform: "none",
                  color: "white",
                  fontSize: { xs: "20px", sm: "24px", md: "32px" },
                  fontFamily: "Kdam Thmor Pro, sans-serif",
                }}
              >
                Join a Team
              </Typography>
            </Button>

            <Button
              onClick={() => router.push("/Add")}
              sx={{
                bgcolor: "black",
                width: "100%",
                height: { xs: "60px", sm: "65px", md: "80px" },
                maxWidth: { xs: "320px", md: "400px" },
                boxShadow: {
                  xs: "0px 0px 3px 3px #FFFFFFCF",
                  md: "0px 0px 10px 10px #FFFFFFCF",
                },
                borderRadius: { xs: "20px", md: "27px" },
              }}
            >
              <Typography
                sx={{
                  textTransform: "none",
                  color: "white",
                  fontSize: { xs: "20px", sm: "24px", md: "32px" },
                  fontFamily: "Kdam Thmor Pro, sans-serif",
                }}
              >
                Add a Team
              </Typography>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
