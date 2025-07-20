"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CCSLogoLarge from "../_components/CCSLogoLarge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Box } from "@mui/material";
import withProtectedRoute from "../_components/ProtectedRoute";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function JoinTeam() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [rollno, setRollno] = useState("");
  const [discord_id, setDiscordId] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    rollno: "",
    discord_id: "",
    teamCode: "",
  });

  const validateInputs = () => {
    const newErrors = {
      username: "",
      rollno: "",
      discord_id: "",
      teamCode: "",
    };

    if (!/^(?![_\.])[a-zA-Z0-9._]{2,32}(?<![_\.])$/.test(username)) {
      newErrors.username =
        "Username must be 2–32 characters using letters, numbers, dots or underscores. No special characters. No trailing or leading underscores.";
    }

    if (!/^\d{4,12}$/.test(rollno)) {
      newErrors.rollno = "Roll number must be between 4 and 12 digits";
    }

    if (!/^[a-zA-Z0-9._]{2,32}$/.test(discord_id)) {
      newErrors.discord_id =
        "Invalid Discord username. Use 2–32 characters (letters, numbers, dots, underscores).";
    }

    if (teamCode.trim().length === 0) {
      newErrors.teamCode = "Team code is required.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === "");
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

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
            username: username,
            rollno: rollno,
            discord_id: discord_id,
            team_code: teamCode,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to join team");
      } else {
        toast.success("Team joined successfully!");
        router.push("/Dashboard");
      }
    } catch (err) {
      toast.error("Something went wrong!");
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

      <div className="relative z-10 pt-4 md:pt-6 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <CCSLogoLarge />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12 relative z-10">
        <div className="w-full max-w-md mx-auto">
          <h1
            className="text-4xl md:text-5xl font-bold text-center mb-8 md:mb-10 tracking-wider"
            style={{
              fontFamily: "Zen Dots",
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
              <div className="space-y-1">
                <Label htmlFor="name" className="text-red-100">
                  Username
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setErrors((errors) => ({ ...errors, username: "" }));
                    setUsername(e.target.value);
                  }}
                  className="bg-red-900/20 border-red-500/50 focus:border-red-400 placeholder:text-red-300/50"
                />
                {errors.username && (
                  <p className="text-red-400 text-sm">{errors.username}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="discord" className="text-red-100">
                  Discord Username
                </Label>
                <Input
                  id="discord"
                  placeholder="Enter your Discord ID"
                  value={discord_id}
                  onChange={(e) => {
                    setErrors((errors) => ({ ...errors, discord_id: "" }));
                    setDiscordId(e.target.value);
                  }}
                  className="bg-red-900/20 border-red-500/50 focus:border-red-400 placeholder:text-red-300/50"
                />
                {errors.discord_id && (
                  <p className="text-red-400 text-sm">{errors.discord_id}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="rollno" className="text-red-100">
                  Roll Number
                </Label>
                <Input
                  id="rollno"
                  placeholder="Enter your Roll Number"
                  value={rollno}
                  onChange={(e) => {
                    setErrors((errors) => ({ ...errors, rollno: "" }));
                    setRollno(e.target.value.replace(/[^\d]/g, ""));
                  }}
                  className="bg-red-900/20 border-red-500/50 focus:border-red-400 placeholder:text-red-300/50"
                />
                {errors.rollno && (
                  <p className="text-red-400 text-sm">{errors.rollno}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="teamCode" className="text-red-100">
                  Team Code
                </Label>
                <Input
                  id="teamCode"
                  placeholder="Enter your team code"
                  value={teamCode}
                  onChange={(e) => {
                    setErrors((errors) => ({ ...errors, teamCode: "" }));
                    setTeamCode(e.target.value);
                  }}
                  className="bg-red-900/20 border-red-500/50 focus:border-red-400 placeholder:text-red-300/50"
                />
                {errors.teamCode && (
                  <p className="text-red-400 text-sm">{errors.teamCode}</p>
                )}
              </div>

              <div className="pt-4 space-y-3">
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full py-6 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-lg shadow-lg shadow-red-600/30 border-none transition-all duration-300"
                >
                  {isLoading ? "JOINING TEAM..." : "SUBMIT"}
                </Button>

                {/* <Button
                  variant="outline"
                  onClick={() => router.push("/Add")}
                  className="w-full py-6 border-2 border-red-500 text-white bg-transparent hover:bg-red-500/20 font-bold text-lg transition-all duration-300"
                >
                  CREATE NEW TEAM
                </Button> */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default withProtectedRoute(JoinTeam);
