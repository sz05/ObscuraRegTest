"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const story = `🌀 OBSCURA — Unleashed Between Worlds. 🌀

In the depths of a forgotten prison, the engineers tore open a portal,
unknowingly unleashing Obscura, the ancient force sealed away by sorcery.

Now free, he has seized control of the overworld’s robots, twisting them into his legion.
To stop him, the engineers and warlocks forged two champions:
“Scurra”, the arcane guardian, and “Scarra”, the digital savant.

But Obscura struck first.
He split their souls and banished them to the Labyrinth — a realm between realms, 
riddled with traps, riddles, and echoes of a broken world.

Your mission:
-- Escape the Labyrinth.
-- Reunite the fractured souls.
-- Sever the portal.
-- End Obscura's reign before both realms fall.

🕒 The clock is ticking. Will you find your way out… or be lost forever?`;

export default function Story() {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && !isComplete && currentIndex < story.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + story[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 20);
      return () => clearTimeout(timer);
    } else if (!loading && !isComplete) {
      setIsComplete(true);
    }
  }, [currentIndex, loading, isComplete]);

  const handleSkip = () => {
    setDisplayedText(story);
    setCurrentIndex(story.length);
    setIsComplete(true);
  };

  const sharedButtonSx = {
    minWidth: { xs: 220, sm: 240, md: 260 },
    px: { xs: 4, sm: 5 },
    py: { xs: 1.5, sm: 1.75 },
    borderRadius: "8px",
    backgroundColor: "#ff3300",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: { xs: "0.95rem", sm: "1rem" },
    boxShadow:
      "0 0 20px 4px rgba(255, 51, 0, 0.6), 0 0 40px 8px rgba(255, 100, 0, 0.4)",
    textTransform: "uppercase",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#ff5500",
      boxShadow:
        "0 0 30px 8px rgba(255, 100, 0, 0.8), 0 0 60px 12px rgba(255, 150, 0, 0.6)",
    },
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <span className="text-[#ff3300] text-xl font-mono animate-pulse">
          Loading story...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blacktext-[#ff3300] text-xl font-mono px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-4xl text-lg leading-relaxed whitespace-pre-wrap">
        {displayedText}
        {!isComplete && (
          <span className="animate-pulsetext-[#ff3300] text-xl font-mono  ml-1">
            |
          </span>
        )}
      </div>

      <Box
        display="flex"
        gap={2}
        flexWrap="wrap"
        justifyContent="center"
        mt={5}
      >
        {!isComplete && (
          <Button onClick={handleSkip} sx={sharedButtonSx}>
            <Typography>Skip Story</Typography>
          </Button>
        )}
        {isComplete && (
          <Button onClick={() => router.push("/register")} sx={sharedButtonSx}>
            <Typography>Register</Typography>
          </Button>
        )}
      </Box>
    </div>
  );
}
