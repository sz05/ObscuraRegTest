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

function CreateTeamPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [rollno, setRollno] = useState("");
  const [discordId, setDiscordId] = useState("");
  const [teamName, setTeamName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    rollno: "",
    discordId: "",
    teamName: "",
  });

  const validateInputs = () => {
    const newErrors = {
      username: "",
      rollno: "",
      discordId: "",
      teamName: "",
    };

    if (!/^(?![_\.])[a-zA-Z0-9._]{2,32}(?<![_\.])$/.test(username)) {
      newErrors.username =
        "Username must be 2–32 characters using letters, numbers, dots or underscores. No special characters.";
    }

    if (!/^\d{4,12}$/.test(rollno)) {
      newErrors.rollno = "Roll number must be between 4 and 12 digits";
    }

    if (!/^(?![_\.])[a-zA-Z0-9._]{2,32}(?<![_\.])$/.test(discordId)) {
      newErrors.discordId =
        "Invalid Discord username. Use 2–32 characters (letters, numbers, underscores, dots). No spaces or special characters.";
    }

    if (!/^[\w\s]{1,20}$/.test(teamName)) {
      newErrors.teamName =
        "Team name must be between 1 and 20 characters and can include letters, numbers, spaces, or underscores.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === "");
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/create-team`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            username: username,
            rollno: rollno,
            discord_id: discordId,
            team_name: teamName,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to create team");
      } else {
        toast.success("Team created successfully!");
        router.push(`/ThankYou?code=${data.team_code}`);
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
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg_image2.png')", opacity: 0.7 }}
        ></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-black/60 z-0" />

      <div className="relative z-10 pt-6 flex items-center justify-between px-4 md:px-6">
        <CCSLogoLarge />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md mx-auto">
          <h1
            className="text-4xl font-bold text-center mb-8 tracking-wider"
            style={{
              fontFamily: "Zen Dots",
              textShadow: "0 0 8px rgba(255, 0, 0, 0.8)",
            }}
          >
            CREATE A TEAM
          </h1>

          <Card className="border-2 border-red-600/70 bg-black/85 backdrop-blur-lg shadow-xl shadow-red-700/30 rounded-lg overflow-hidden">
            <CardHeader className="py-5 border-b border-red-500/30 bg-gradient-to-r from-red-900/30 to-pink-900/30">
              <CardTitle
                className="text-xl text-center text-white font-bold"
                style={{ textShadow: "0 0 5px #f43f5e" }}
              >
                ENTER YOUR DETAILS
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5 pt-5 px-6">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your user name"
                  value={username}
                  onChange={(e) => {
                    setErrors((errors) => ({ ...errors, username: "" }));
                    setUsername(e.target.value);
                  }}
                />
                {errors.username && (
                  <p className="text-red-400 text-sm">{errors.username}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="discord">Discord Username</Label>
                <Input
                  id="discord"
                  placeholder="Enter your Discord ID"
                  value={discordId}
                  onChange={(e) => {
                    setErrors((errors) => ({ ...errors, discordId: "" }));
                    setDiscordId(e.target.value);
                  }}
                />
                {errors.discordId && (
                  <p className="text-red-400 text-sm">{errors.discordId}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="rollno">Roll Number</Label>
                <Input
                  id="rollno"
                  placeholder="Enter your Roll Number"
                  value={rollno}
                  onChange={(e) => {
                    setErrors((errors) => ({ ...errors, rollno: "" }));
                    setRollno(e.target.value.replace(/[^\d]/g, ""));
                  }}
                />
                {errors.rollno && (
                  <p className="text-red-400 text-sm">{errors.rollno}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  id="teamName"
                  placeholder="Enter your team name"
                  value={teamName}
                  onChange={(e) => {
                    setErrors((errors) => ({ ...errors, teamName: "" }));
                    setTeamName(e.target.value);
                  }}
                />
                {errors.teamName && (
                  <p className="text-red-400 text-sm">{errors.teamName}</p>
                )}
              </div>

              <div className="pt-6 space-y-4">
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full py-6 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold text-lg shadow-lg transition-all duration-300"
                >
                  {isLoading ? "CREATING TEAM..." : "SUBMIT"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/Join")}
                  className="w-full py-5 border-2 border-red-500 text-white bg-black/30 hover:bg-red-500/20 font-bold text-lg transition-all duration-300"
                >
                  JOIN EXISTING TEAM
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default withProtectedRoute(CreateTeamPage);
