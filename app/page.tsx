"use client";

import ShiftingCountdown from "../components/ui/countdown-timer";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { toast, Toaster } from "sonner";
import CCSLogoLarge from "./_components/CCSLogoLarge";
import { BrandsGrid } from "./_components/BrandGrid";

type Sponsor = {
  id: number;
  name: string;
  logo: string;
  website: string;
};

const sponsors: Sponsor[] = [
  {
    id: 1,
    name: "Syntx",
    logo: "/sponsors/syntx.svg",
    website: "https://syntx.dev/",
  },
  {
    id: 2,
    name: "Deradh",
    logo: "/sponsors/deradh.png",
    website: "https://www.deradh.com/",
  },
  {
    id: 3,
    name: "KOMPTE",
    logo: "/sponsors/kompte.webp",
    website: "https://www.kompte.com/",
  },
  {
    id: 4,
    name: "MedX",
    logo: "/sponsors/medx.png",
    website: "https://medx.org.in/",
  },
  {
    id: 5,
    name: "Rebec",
    logo: "/sponsors/rebec.png",
    website: "https://rebec.in/",
  },
  {
    id: 6,
    name: "Talkeys",
    logo: "/sponsors/talkeys.png",
    website: "https://www.talkeys.xyz/",
  },
];

export default function Page() {
  const router = useRouter();

  const handleLogin = () => {
    if (verify) {
      router.push("/Dashboard");
      return;
    }
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`;
  };

  // Set initial title on component mount
  useEffect(() => {
    document.title = "Checkmate";
  }, []);

  const [verify, setVerified] = useState(false);

  const checkVerified = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/verify`, {
        credentials: "include",
      });
      const data = await res.json();
      setVerified(data.registered);
      if (!res.ok) throw new Error(data.error);
    } catch {
      alert("Failed");
      setVerified(false);
    }
  };
  useEffect(() => {
    checkVerified();
  }, []);

  const handleDashboardClick = () => {
    if (verify) {
      router.push("/Dashboard");
      return;
    } else {
      window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`;
    }
  };

  const handleLogout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    // const data = await res.json();

    if (!res.ok) toast.error("Logout failed");
    // else window.location.href = "/";
    else {
      // window.location.href = "/";
      toast.success("Logged out successfully");
    }
  };

  return (
    <>
      {verify ? (
        <Box className="fixed top-4 right-4" zIndex={999}>
          <Button
            sx={{ cursor: "pointer" }}
            onClick={handleLogout}
            color="error"
            variant="contained"
            size="small"
          >
            Logout
          </Button>
        </Box>
      ) : null}
      <Toaster richColors position="top-right" />
      <div
        className="relative min-h-[80vh] sm:min-h-[90vh] md:min-h-screen flex flex-col"
        style={{
          backgroundImage: "url('/bg_image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/50 md:bg-black/40 z-10"></div>

        <div className="relative z-20 flex flex-col justify-center items-center min-h-[80vh] sm:min-h-[90vh] md:min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-10 sm:py-12 md:py-16 lg:py-20">
          <div className="flex flex-col items-center text-center gap-4 sm:gap-6 md:gap-8 pt-8 sm:pt-0">
            <div className="flex flex-row items-center justify-center gap-4">
              <CCSLogoLarge />
              <Box
                component="img"
                src="/froshLogo.png"
                alt="Frosh Logo"
                sx={{
                  width: {
                    xs: "175px",
                    sm: "200px",
                    md: "235px",
                  },
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>

            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-megarok leading-none tracking-wider drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
              PRESENTS
            </h2>

            <h1 className="text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-9xl font-megarok leading-none tracking-wider drop-shadow-[0_0_15px_rgba(0,0,0,0.9)]">
              CHECKMATE
            </h1>

            <h3
              className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 
             text-3xl sm:text-4xl md:text-5xl font-['GothamXNarrow'] tracking-wide animate-pulse
             drop-shadow-[0_0_15px_rgba(255,200,0,0.8)]"
            >
              Prizes Worth ₹40K
            </h3>

            {/* <h3
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-400 to-blue-500 
             text-3xl sm:text-4xl md:text-5xl font-['GothamXNarrow'] tracking-wide
             drop-shadow-[0_0_15px_rgba(255,200,0,0.8)]"
            >
              Prizes Worth ₹40K
            </h3> */}

            <div className="mt-4 sm:mt-6 mb-6 sm:mb-8 w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
{/*               <ShiftingCountdown /> */}
              <Typography fontFamily="gothamXNarrow" fontSize={20}>
  The Event is Now Live!
</Typography>

            </div>
          </div>
        </div>
      </div>
      <section
        id="section2"
        className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden"
      >
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          {/* Animated gradient mesh */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-red-500/[0.15] via-orange-500/[0.1] to-red-600/[0.12]"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "400% 400%",
            }}
          />

          {/* Digital grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                                 linear-gradient(rgba(255,51,0,0.3) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(255,51,0,0.3) 1px, transparent 1px)
                             `,
              backgroundSize: "50px 50px",
            }}
          />

          {/* Moving light orbs */}
          <motion.div
            className="absolute top-1/4 left-1/6 w-48 sm:w-72 h-48 sm:h-72 bg-red-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 60, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/6 w-56 sm:w-80 h-56 sm:h-80 bg-orange-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, -40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-400/60 rounded-full"
              style={{
                left: `${20 + i * 8}%`,
                top: `${30 + i * 6}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + i * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            />
          ))}
        </div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20  "
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {/* <motion.button
              onClick={() => router.push("https://obscura-demo.ccstiet.com/")}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 backdrop-blur-sm mb-8"
              whileHover={{ scale: 1.05, borderColor: "rgba(255, 51, 0, 0.5)" }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-red-400" />
              </motion.div>
              <span className="text-xl font-medium text-white/90 font-['GothamXNarrow'] uppercase tracking-wide">
                PLAY DEMO NOW
              </span>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            </motion.button> */}
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-megarok mb-6 tracking-wider leading-tight"
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-400 to-red-300 drop-shadow-lg">
                HACK THE MAZE
              </span>
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed mb-8 font-['GothamXNarrow']"
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              Where logic collides with sorcery, the rogue mastermind{" "}
              <span className="text-orange-400 font-bold">Checkmate</span> has
              seized control of the overworld’s robotic legions. Enter the{" "}
              <span className="text-red-400 font-bold">
                ultimate hacking gauntlet
              </span>
              , navigate the{" "}
              <span className="text-red-400 font-bold">digital labyrinth</span>,
              and claim your triumph.{" "}
            </motion.p>

            <motion.p
              className="text-lg sm:text-3xl md:text-4xl text-red-300 font-megarok mb-12 tracking-wide"
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              Are you smart enough to escape? Or will the glitch claim you too?
            </motion.p>
            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-lg mx-auto"
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <ShimmerButton
                onClick={handleLogin}
                className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-purple-700 to-indigo-900 text-white font-bold text-lg font-['GothamXNarrow'] uppercase tracking-wide transition-all duration-300 ease-in-out border-2 border-purple-500/70 hover:border-purple-400 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-800 hover:to-indigo-950 relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                Register Now
              </ShimmerButton>

              <ShimmerButton
                onClick={handleDashboardClick}
                className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-orange-700 to-red-900 text-white font-bold text-lg font-['GothamXNarrow'] uppercase tracking-wide transition-all duration-300 ease-in-out border-2 border-orange-500/70 hover:border-orange-400 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-800 hover:to-indigo-950 relative overflow-hidden group"
              >
                Play
              </ShimmerButton>
            </motion.div>
          </motion.div>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            // mt={4}
            gap={2}
            flexDirection="column"
          >
            <Box bgcolor="#2C2F33" p={2} borderRadius={4}>
              <Typography
                zIndex={99}
                fontSize={25}
                component="a"
                href="https://discord.gg/6fKxYrHvXw"
                target="_blank"
                sx={{
                  color: "#7289DA",
                  fontWeight: "bold",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  mt: 1,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Join our Discord
              </Typography>
            </Box>
            <Typography color="red">
              Note: It is compulsory to join discord to participate in the event
            </Typography>
          </Box>
        </motion.div>
      </section>
      <section
        id="sponsors"
        className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-8xl font-megarok mb-10 text-center tracking-wider leading-tight text-white">
            Our Sponsors
          </h2>
          <BrandsGrid brands={sponsors} />
        </div>
      </section>
    </>
  );
}
