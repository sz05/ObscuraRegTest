"use client";

import {
  Box,
  Button,
  Card,
  Container,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { useEffect, useState } from "react";
import CCSLogoLarge from "../_components/CCSLogoLarge";

type Role = "WIZARD" | "HACKER";

type Member = {
  email: string;
  name: string;
  discord_id: string;
  id: string;
  is_wizard: boolean;
  is_hacker: boolean;
};

export default function TeamDashboard() {
  const [members, setMembers] = useState<Member[]>([]);
  const [teamCode, setTeamCode] = useState("");
  const [isLeader, setIsLeader] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    // Mocked data for local testing
    const players: Member[] = [
      {
        name: "Alice",
        email: "alice@example.com",
        discord_id: "alice#1234",
        id: "1",
        is_wizard: true,
        is_hacker: false,
      },
      {
        name: "Bob",
        email: "bob@example.com",
        discord_id: "bob#5678",
        id: "2",
        is_wizard: false,
        is_hacker: true,
      },
      {
        name: "Charlie",
        email: "charlie@example.com",
        discord_id: "charlie#9999",
        id: "3",
        is_wizard: false,
        is_hacker: true,
      },
    ];

    setMembers(players);
    setTeamCode("CCS12345");
    setIsLeader(true); // toggle this to false to test the non-leader view
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/team-dashboard`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.error);

      const players: Member[] = data.players.map((p: any) => ({
        name: p.name,
        email: p.email,
        discord_id: p.discord_id,
        id: p.id,
        is_wizard: p.is_wizard ?? false,
        is_hacker: p.is_hacker ?? true,
      }));

      setMembers(players);
      setTeamCode(data.team_code);
      setIsLeader(data.is_leader);
    } catch {
      alert("Failed to load dashboard.");
    }
  };

  const handleRoleChange = (index: number, role: Role | null) => {
    if (!role) return;

    const hackerCount = members.filter((m) => m.is_hacker).length;
    const wizardCount = members.filter((m) => m.is_wizard).length;

    const isCurrentlyHacker = members[index].is_hacker;
    const isCurrentlyWizard = members[index].is_wizard;

    if (role === "HACKER" && hackerCount >= 2 && !isCurrentlyHacker) return;
    if (role === "WIZARD" && wizardCount >= 2 && !isCurrentlyWizard) return;

    setMembers((prev) =>
      prev.map((m, i) =>
        i === index
          ? {
              ...m,
              is_hacker: role === "HACKER",
              is_wizard: role === "WIZARD",
            }
          : m
      )
    );
  };

  const handleSave = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/team-dashboard`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ team_code: teamCode, players: members }),
      }
    );
    console.log(JSON.stringify({ team_code: teamCode, players: members }));

    const data = await res.json();
    if (!res.ok) alert(data.error || "Save failed");
    else alert("Roles saved successfully!");
  };

  const handleLogout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) alert("Logout failed");
    else window.location.href = "/";
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const getRole = (member: Member) => (member.is_hacker ? "HACKER" : "WIZARD");

  // Use local images for avatars - alternating between scarra and scurra based on index
  const getAvatarUrl = (role: string) =>
    // index % 2 === 0 ? "/scarra.png" : "/scurra.png";
    role === "WIZARD" ? "scarra.png" : "scurra.png";

  const renderCard = (member: Member, index: number, label: string) => {
    const role = getRole(member);
    const bgColor = role === "HACKER" ? "#1E3A8A" : "#7F1D1D"; // blue/red
    const badgeColor = role === "HACKER" ? "#3B82F6" : "#EF4444";

    return (
      <Card
        key={index}
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "#111",
          border: `2px solid ${badgeColor}`,
          borderRadius: "12px",
          padding: "1rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            minWidth: 60,
            borderRadius: "8px",
            overflow: "hidden",
            mr: 2,
            backgroundColor: "#000",
          }}
        >
          <img
            src={getAvatarUrl(role)}
            alt="avatar"
            width="60"
            height="60"
            className="object-cover"
          />
        </Box>

        <Box sx={{ flex: "1 1 auto", color: "white" }}>
          <Typography fontWeight={600}>{member.name}</Typography>
          <Typography variant="body2" color="gray">
            {member.email}
          </Typography>
        </Box>

        {isLeader ? (
          <Box
            sx={{ display: "flex", alignItems: "center", mt: { xs: 2, sm: 0 } }}
          >
            <ToggleButtonGroup
              value={role}
              exclusive
              onChange={(e, r) => handleRoleChange(index, r)}
              sx={{
                bgcolor: "#1a1a1a",
                borderRadius: 2,
                "& .MuiToggleButton-root": {
                  color: "#fff",
                  borderColor: "#333",
                  "&.Mui-selected": {
                    bgcolor: badgeColor,
                    borderColor: badgeColor,
                  },
                },
              }}
            >
              <ToggleButton value="HACKER">Hacker</ToggleButton>
              <ToggleButton value="WIZARD">Wizard</ToggleButton>
            </ToggleButtonGroup>
            {/* Kick Button
            {index !== 0 && (
              <Button
                size="small"
                color="error"
                sx={{ ml: 2, textTransform: "none" }}
                onClick={() => alert("Kick not implemented")}
              >
                Kick
              </Button>
            )} */}
          </Box>
        ) : (
          <Box
            sx={{
              mt: { xs: 2, sm: 0 },
              backgroundColor: badgeColor,
              color: "white",
              fontWeight: "bold",
              px: 2,
              py: 0.5,
              borderRadius: "8px",
            }}
          >
            {role}
          </Box>
        )}
      </Card>
    );
  };

  return (
    <Box
      className="min-h-screen flex flex-col items-center justify-start p-4 pb-32 relative"
      sx={{
        backgroundImage: "url('/bg_image_old.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay to dim the background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.65)", // Dimming overlay
          zIndex: 0,
        }}
      />

      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        mb={4}
        sx={{ position: "relative", zIndex: 1 }}
      >
        <CCSLogoLarge />
        <Button onClick={handleLogout} color="error" variant="contained">
          Logout
        </Button>
      </Box>

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h6" fontWeight="bold" color="red">
            TEAM CODE
          </Typography>
          <Typography variant="h4" fontWeight="bold" color="white">
            {teamCode}{" "}
            <Tooltip title={copied ? "Copied!" : "Copy"}>
              <IconButton
                size="small"
                onClick={() => {
                  navigator.clipboard.writeText(teamCode);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1000);
                }}
              >
                <ContentCopy sx={{ color: "white", fontSize: "1rem" }} />
              </IconButton>
            </Tooltip>
          </Typography>
        </Box>

        {members.map((member, i) =>
          renderCard(member, i, i === 0 ? "LEADER" : `MEMBER ${i}`)
        )}

        {isLeader && (
          <Box textAlign="center" mt={4}>
            <Button variant="contained" color="error" onClick={handleSave}>
              SAVE ROLES
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
