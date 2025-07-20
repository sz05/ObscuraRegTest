"use client";

import CCSLogo from "./_components/CCSLogoLarge";
import ShiftingCountdown from "../components/ui/countdown-timer";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { useEffect } from "react";
import { BrandsGrid } from "@/components/SponsorsGrid";

// Define sponsor type
type Sponsor = {
  id: number;
  name: string;
  logo: string;
  website: string;
};

// Hardcoded list of sponsors
const sponsors: Sponsor[] = [
  {
    id: 2,
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

  // Removed Register button logic

  // Set initial title on component mount
  useEffect(() => {
    document.title = "Obscura";
  }, []);

  const [registered, setRegistered] = useState(false);

  const checkRegistered = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkRegistered`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      setRegistered(data.registered);
      if (!res.ok) throw new Error(data.error);
    } catch {
      alert("Failed");
      setRegistered(false);
    }
  };
  useEffect(() => {
    checkRegistered();
  }, []);

  // const handleDashboardClick = async () => {
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkRegistered`,
  //       {
  //         credentials: "include",
  //       }
  //     );
  //     const data = await res.json();
  //     if (data.registered) {
  //       router.push("/Dashboard");
  //     } else {
  //       window.location.href = "https://obscura.ccstiet.com/login";
  //     }
  //   } catch {
  //     window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`;
  //   }
  // };

  const handleDashboardClick = () => {
    if (registered) {
      router.push("/Dashboard");
      return;
    } else {
      localStorage.setItem("redirectTo", "Dashboard");
      window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`;
    }
  };
  const handlePlayClick = () => {
    if (registered) {
      router.push("/play");
      return;
    } else {
      localStorage.setItem("redirectTo", "play");
      window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`;
    }
  };

  // const handlePlayClick = async () => {
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkRegistered`,
  //       {
  //         credentials: "include",
  //       }
  //     );
  //     const data = await res.json();
  //     if (data.registered) {
  //       router.push("/play");
  //     } else {
  //       window.location.href = "https://obscura.ccstiet.com";
  //     }
  //   } catch {
  //     window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`;
  //   }
  // };

  return (
    <>
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
            <div className="w-24 h-16 sm:w-28 sm:h-18 md:w-36 md:h-22 lg:w-44 lg:h-26 xl:w-52 xl:h-32">
              <CCSLogo className="w-full h-full" />
            </div>

            <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-megarok leading-none tracking-wider drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
              PRESENTS
            </h2>

            <h1 className="text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-9xl font-megarok leading-none tracking-wider drop-shadow-[0_0_15px_rgba(0,0,0,0.9)]">
              OBSCURA
            </h1>

            <div className="mt-4 sm:mt-6 mb-6 sm:mb-8 w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
              <ShiftingCountdown />
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
            className="text-center mb-12 sm:mb-16"
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
              In a{" "}
              <span className="text-red-400 font-bold">fractured realm</span>{" "}
              between logic and sorcery, a rogue demonic entity named{" "}
              <span className="text-orange-400 font-bold">Obscura</span> has
              hijacked the overworld's robotic army and fractured two souls into
              hacker and wizard. Now , with your{" "}
              <span className="text-red-400 font-bold"> team of 4 </span> ,
              you're trapped in a shifting digital labyrinth, you and your team
              must outwit firewalls, dodge arcane traps, and decode corrupted
              transmissions.
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
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-lg mx-auto"
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <ShimmerButton
                onClick={handlePlayClick}
                className="w-full sm:w-auto px-8 py-4 my-8 rounded-lg bg-gradient-to-r from-orange-700 to-red-900 text-white font-bold text-lg font-['GothamXNarrow'] uppercase tracking-wide transition-all duration-300 ease-in-out border-2 border-orange-500/70 hover:border-orange-400 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-800 hover:to-indigo-950 relative overflow-hidden group"
              >
                Play
              </ShimmerButton>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-lg mx-auto"
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <ShimmerButton
                onClick={handleDashboardClick}
                className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-orange-700 to-red-900 text-white font-bold text-lg font-['GothamXNarrow'] uppercase tracking-wide transition-all duration-300 ease-in-out border-2 border-orange-500/70 hover:border-orange-400 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-800 hover:to-indigo-950 relative overflow-hidden group"
              >
                Team Dashboard
              </ShimmerButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      {/* Sponsors Section */}
      <section
        id="sponsors"
        className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-megarok mb-10 text-center tracking-wider leading-tight text-white">
            Our Sponsors
          </h2>
          <BrandsGrid brands={sponsors} />
        </div>
      </section>
    </>
  );
}
