"use client";

import {
  Box,
  Button,
  Card,
  Container,
  Typography,
  IconButton,
  Tooltip,
  MenuItem,
  Select,
} from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { useEffect, useState } from "react";
import CCSLogoLarge from "../_components/CCSLogoLarge";
import withProtectedRoute from "../_components/ProtectedRoute";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

type Role = "WIZARD" | "HACKER";

type Member = {
  rollno: string;
  email: string;
  name: string;
  discord_id: string;
  id: string;
  is_wizard: boolean;
  is_hacker: boolean;
};

function TeamDashboard() {
  const [members, setMembers] = useState<Member[]>([]);
  const [teamCode, setTeamCode] = useState("");
  const [isLeader, setIsLeader] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  const handleLogout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) alert("Logout failed");
    else window.location.href = "/";
  };

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
        rollno: p.rollno,
        discord_id: p.discord_id,
        id: p.id,
        is_wizard: p.is_wizard ?? false,
        is_hacker: p.is_hacker ?? true,
      }));

      setMembers(players);
      setTeamCode(data.team_code);
      setIsLeader(data.is_leader);
      setCurrentUserEmail(data.currentUserEmail);
    } catch {
      toast.error("Failed to load dashboard.");
    }
  };

  const handleRoleChange = (index: number, role: Role | null) => {
    if (!role) return;

    const hackerCount = members.filter((m) => m.is_hacker).length;
    const wizardCount = members.filter((m) => m.is_wizard).length;

    const isCurrentlyHacker = members[index].is_hacker;
    const isCurrentlyWizard = members[index].is_wizard;

    if (role === "HACKER" && hackerCount >= 2 && !isCurrentlyHacker) {
      toast.error("Only 2 Hackers allowed");
      return;
    }
    if (role === "WIZARD" && wizardCount >= 2 && !isCurrentlyWizard) {
      toast.error("Only 2 Wizards allowed");
      return;
    }

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
  const router = useRouter();

  // const handleSave = async () => {
  //   const hackerCount = members.filter((m) => m.is_hacker).length;
  //   const wizardCount = members.filter((m) => m.is_wizard).length;

  //   if (hackerCount !== 2 || wizardCount !== 2) {
  //     toast.error("Please assign exactly 2 Hackers and 2 Wizards.");
  //     return;
  //   }

  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/team-dashboard`,
  //     {
  //       method: "POST",
  //       credentials: "include",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ team_code: teamCode, players: members }),
  //     }
  //   );

  //   const data = await res.json();
  //   if (!res.ok) toast.error(data.error || "Save failed");
  //   else toast.success("Roles saved successfully!");
  // };

  const handleSave = async () => {
    const hackerCount = members.filter((m) => m.is_hacker).length;
    const wizardCount = members.filter((m) => m.is_wizard).length;

    if (hackerCount !== 2 || wizardCount !== 2) {
      toast.error("Please assign exactly 2 Hackers and 2 Wizards.");
      return;
    }

    const invalidMembers = members.filter(
      (m) => (m.is_hacker && m.is_wizard) || (!m.is_hacker && !m.is_wizard)
    );

    if (invalidMembers.length > 0) {
      toast.error(
        "Each member must be either a Hacker or a Wizard — not both or neither."
      );
      console.warn("Invalid members found:", invalidMembers);
      return;
    }

    const payload = {
      team_code: teamCode,
      players: members.map((m) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        rollno: m.rollno,
        discord_id: m.discord_id,
        is_hacker: m.is_hacker,
        is_wizard: m.is_wizard,
      })),
    };

    console.log("Payload being sent to backend:", payload);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/team-dashboard`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();
    if (!res.ok) toast.error(data.error || "Save failed");
    else toast.success("Roles saved successfully!");
  };

  const handleKick = async (email: string) => {
    // console.log(email);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/remove-from-team`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_to_remove: email }),
      }
    );

    const data = await res.json();
    if (!res.ok) toast.error(data.error || "Kick failed");
    else {
      toast.success("Member kicked!");
      fetchDashboard();
    }
  };

  const handleLeave = async (email: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/leave-team`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();
    if (!res.ok) toast.error(data.error || "Leave failed");
    else {
      toast.success("Team Left!");
      router.push("/");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const getRole = (member: Member) => (member.is_hacker ? "HACKER" : "WIZARD");
  const getAvatarUrl = (role: string) =>
    role === "WIZARD" ? "scarra.png" : "scurra.png";

  const renderCard = (member: Member, index: number) => {
    const role = getRole(member);
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
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Box display="flex" gap={2} flex={1} alignItems="center">
          <img
            src={getAvatarUrl(role)}
            alt="avatar"
            width={60}
            height={60}
            style={{ borderRadius: 8 }}
          />
          <Box color="white">
            <Typography fontWeight={600}>{member.name}</Typography>
            <Typography variant="body2" color="gray">
              {member.email}
            </Typography>
            <Typography variant="body2" color="gray">
              Discord: {member.discord_id || "Not provided"}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" gap={2} alignItems="center">
          {isLeader ? (
            <>
              <Select
                value={role}
                onChange={(e) =>
                  handleRoleChange(index, e.target.value as Role)
                }
                sx={{
                  backgroundColor: "#1a1a1a",
                  color: "white",
                  border: "1px solid #444",
                  "& .MuiSelect-icon": {
                    color: "white",
                  },
                }}
              >
                <MenuItem value="HACKER">Hacker</MenuItem>
                <MenuItem value="WIZARD">Wizard</MenuItem>
              </Select>
              {index !== 0 && (
                <Button color="error" onClick={() => handleKick(member.email)}>
                  Kick
                </Button>
              )}
            </>
          ) : (
            <>
              <Box
                sx={{
                  backgroundColor: badgeColor,
                  color: "white",
                  px: 2,
                  py: 0.5,
                  borderRadius: "8px",
                }}
              >
                {role}
              </Box>
              {index !== 0 && member.email === currentUserEmail && (
                <Button
                  size="small"
                  color="warning"
                  onClick={() => handleLeave(member.email)}
                >
                  Leave Team
                </Button>
              )}
            </>
          )}
        </Box>
      </Card>
    );
  };

  return (
    <Box
      className="min-h-screen flex flex-col items-center p-4 pb-32 relative"
      sx={{
        backgroundImage: "url('/bg_image_old.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ToastContainer />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          zIndex: 0,
        }}
      />

      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        sx={{ zIndex: 1 }}
      >
        <Box sx={{ width: { xs: "120px", sm: "150px" } }}>
          <CCSLogoLarge />
        </Box>
        <Button
          onClick={handleLogout}
          color="error"
          variant="contained"
          size="small"
        >
          Logout
        </Button>
      </Box>

      <Container maxWidth="sm" sx={{ zIndex: 1 }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h6" fontWeight="bold" color="red">
            TEAM CODE
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <Typography variant="h4" fontWeight="bold" color="white">
              {teamCode}
            </Typography>
            <Tooltip title={copied ? "Copied!" : "Copy"}>
              <IconButton
                size="small"
                onClick={() => {
                  navigator.clipboard.writeText(teamCode);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1000);
                }}
              >
                <ContentCopy sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {members.map((member, i) => renderCard(member, i))}

        {isLeader && (
          <Box textAlign="center" mt={4}>
            <Button variant="contained" color="error" onClick={handleSave}>
              SAVE ROLES
            </Button>
            <Box
              sx={{
                mt: 1,
                mb: 4,
                p: 2,
                color: "white",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                color="#FF5555"
                gutterBottom
              >
                Choose Your Roles
              </Typography>
              <Typography color="#FFD700" variant="body1" gutterBottom>
                Your team must have <strong>exactly 2 Wizards</strong> and{" "}
                <strong>2 Hackers</strong>.
              </Typography>
              <Typography variant="body2" color="#F1F1F1">
                Wizards solve enchanted logic puzzles. Hackers tackle CTF-style
                digital challenges.
                <br />
                Dont Worry , You can change these roles later.
              </Typography>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default withProtectedRoute(TeamDashboard);
