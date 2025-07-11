"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CCSLogoLarge from "../_components/CCSLogoLarge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Box } from "@mui/material";

export default function JoinTeam() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [discord_id, setDiscordId] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/join-team`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username,
            discord_id,
            team_code: teamCode,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to join team");
      } else {
        alert("Team joined successfully!");
        router.push("/Dashboard");
      }
    } catch (err) {
      console.error("Error joining team", err);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
      <Box className="absolute top-4 right-4 z-20">
        <Button
          onClick={() => router.push("/")}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2"
        >
          Home
        </Button>
      </Box>

      {/* Red Circuit Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/bg_image2.png')", opacity: 0.7 }}
        ></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-black/60 z-0"></div>

      {/* Header */}
      <div className="relative z-10 pt-4 md:pt-6 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <CCSLogoLarge />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12 relative z-10">
        <div className="w-full max-w-md mx-auto">
          <h1
            className="text-4xl md:text-5xl font-bold text-center mb-8 md:mb-10 tracking-wider"
            style={{
              fontFamily: "megarok",
              textShadow: "0 0 8px rgba(239, 68, 68, 0.9)",
            }}
          >
            Join a team
          </h1>

          <Card className="border-2 border-red-600/50 bg-black/60 backdrop-blur-md shadow-lg shadow-red-500/20">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl text-center text-white">
                Enter your details
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-red-100">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-red-900/20 border-red-500/50 focus:border-red-400 placeholder:text-red-300/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-red-100">
                  Discord Id
                </Label>
                <Input
                  id="discord"
                  type="id"
                  placeholder="Enter your discord id"
                  value={discord_id}
                  onChange={(e) => setDiscordId(e.target.value)}
                  className="bg-red-900/20 border-red-500/50 focus:border-red-400 placeholder:text-red-300/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-red-100">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-red-900/20 border-red-500/50 focus:border-red-400 placeholder:text-red-300/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teamCode" className="text-red-100">
                  Team Code
                </Label>
                <Input
                  id="teamCode"
                  placeholder="Enter your team code"
                  value={teamCode}
                  onChange={(e) => setTeamCode(e.target.value)}
                  className="bg-red-900/20 border-red-500/50 focus:border-red-400 placeholder:text-red-300/50"
                />
              </div>

              <div className="pt-4 space-y-3">
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full py-6 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-lg shadow-lg shadow-red-600/30 border-none transition-all duration-300"
                >
                  {isLoading ? "JOINING TEAM..." : "SUBMIT"}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => router.push("/Add")}
                  className="w-full py-6 border-2 border-red-500 text-white bg-transparent hover:bg-red-500/20 font-bold text-lg transition-all duration-300"
                >
                  CREATE NEW TEAM
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
