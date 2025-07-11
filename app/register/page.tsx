"use client";

import Bg from "./components/Bg";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CCSLogoLarge from "../_components/CCSLogoLarge";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [registered, setRegistered] = useState(false);

  const checkVerify = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/verify`, {
        credentials: "include",
      });
      const data = await res.json();
      setRegistered(data.registered);
      if (data.registered) {
        router.push("/Dashboard");
        return;
      }
      if (!res.ok) throw new Error(data.error);
    } catch {
      alert("Failed");
    }
  };
  useEffect(() => {
    // checkVerify();
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Bg />

      <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10">
        <CCSLogoLarge />
      </div>

      <div className="flex justify-center h-full w-full">
        <div className="hidden md:flex flex-1" />

        <div className="flex flex-col justify-between md:justify-center items-center w-full md:max-w-md px-4 md:pr-36 py-6 md:mr-32">
          <h1 className="text-7xl md:text-9xl md:mb-20 font-bold tracking-widest font-megarok text-center mt-28 md:mt-0">
            REGISTER NOW
          </h1>

          <div className="flex flex-col items-center space-y-12 w-full mb-4 md:mb-0">
            <Button
              onClick={() => router.push("/Join")}
              sx={{
                background: "linear-gradient(135deg, #3730A3 0%, #312E81 100%)",
                width: "100%",
                height: { xs: "60px", sm: "65px", md: "80px" },
                maxWidth: { xs: "320px", md: "400px" },
                border: "2px solid rgba(124, 58, 237, 0.5)",
                borderRadius: { xs: "20px", md: "27px" },
                transition: "all 0.3s ease",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #4338CA 0%, #3730A3 100%)",
                  transform: "translateY(-3px)",
                  border: "2px solid rgba(139, 92, 246, 0.8)",
                },
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
                background: "linear-gradient(135deg, #5B21B6 0%, #7E22CE 100%)",
                width: "100%",
                height: { xs: "60px", sm: "65px", md: "80px" },
                maxWidth: { xs: "320px", md: "400px" },
                border: "2px solid rgba(139, 92, 246, 0.5)",
                borderRadius: { xs: "20px", md: "27px" },
                transition: "all 0.3s ease",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)",
                  transform: "translateY(-3px)",
                  border: "2px solid rgba(167, 139, 250, 0.8)",
                },
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
