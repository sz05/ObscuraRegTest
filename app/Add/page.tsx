"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CCSLogoLarge from "../_components/CCSLogoLarge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Box, Typography } from "@mui/material";

export default function CreateTeamPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [discordId, setDiscordId] = useState("");
  const [teamName, setTeamName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/create-team`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username,
            email,
            discord_id: discordId,
            team_name: teamName,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to create team");
      } else {
        alert("Team created successfully!");
        router.push(`/ThankYou?code=${data.team_code}`);
      }
    } catch (err) {
      console.error("Error submitting form", err);
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

      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/bg_image2.png')", opacity: 0.7 }}
        ></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-black/60 z-0"></div>

      <div className="relative z-10 pt-3 sm:pt-4 md:pt-6 flex items-center justify-between px-3 sm:px-4 md:px-6">
        <CCSLogoLarge className="scale-90 sm:scale-100" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-3 sm:px-4 py-6 md:py-8 relative z-10">
        <div className="w-full max-w-md mx-auto">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-6 md:mb-8 tracking-wider glitch-text"
            style={{
              fontFamily: "megarok",
              textShadow: "0 0 8px rgba(255, 0, 0, 0.8)",
            }}
          >
            CREATE A TEAM
          </h1>

          <Card className="border-2 border-red-600/70 bg-black/85 backdrop-blur-lg shadow-xl shadow-red-700/30 rounded-lg overflow-hidden">
            <CardHeader className="py-4 sm:py-5 border-b border-red-500/30 bg-gradient-to-r from-red-900/30 to-pink-900/30">
              <CardTitle
                className="text-lg sm:text-xl md:text-2xl text-center text-white font-bold"
                style={{ textShadow: "0 0 5px #f43f5e" }}
              >
                ENTER YOUR DETAILS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-5 px-4 sm:px-6">
              <div className="space-y-2">
                <Label htmlFor="name">NAME</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Discord Id</Label>
                <Input
                  id="discord"
                  type="id"
                  placeholder="Enter your discord id"
                  value={discordId}
                  onChange={(e) => setDiscordId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">EMAIL</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamName">TEAM NAME</Label>
                <Input
                  id="teamName"
                  placeholder="Enter your team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>
              <div className="pt-6 space-y-4">
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full py-5 sm:py-6 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold text-base sm:text-lg shadow-lg shadow-red-600/30 border-none transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  {isLoading ? "CREATING TEAM..." : "SUBMIT"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/Join")}
                  className="w-full py-4 sm:py-5 border-2 border-red-500 text-white bg-black/30 hover:bg-red-500/20 font-bold text-base sm:text-lg transition-all duration-300"
                >
                  JOIN EXISTING TEAM
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
