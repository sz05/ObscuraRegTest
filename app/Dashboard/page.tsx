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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ContentCopy, InfoOutlined } from "@mui/icons-material";
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
  const [rulebookOpen, setRulebookOpen] = useState(false);

  const handleLogout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) toast.error("Logout failed");
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

  const handleDeleteTeam = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your team? This cannot be undone."
      )
    )
      return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/delete-team`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Team deletion failed");
      } else {
        toast.success("Team deleted successfully!");
        router.push("/register");
      }
    } catch (error) {
      toast.error("Error deleting team");
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
      // return;
    }
    if (role === "WIZARD" && wizardCount >= 2 && !isCurrentlyWizard) {
      toast.error("Only 2 Wizards allowed");
      // return;
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
    toast.error(
      `Add ${
        4 - (hackerCount + wizardCount)
      } more members to complete registration of your team `
    );

    if (hackerCount < 2 || wizardCount < 2) {
      toast.error("You must assign exactly 2 Hackers and 2 Wizards.");
      return;
    }

    const invalidMembers = members.filter(
      (m) => (m.is_hacker && m.is_wizard) || (!m.is_hacker && !m.is_wizard)
    );

    if (invalidMembers.length > 0) {
      toast.error(
        "Each member must be either a Hacker or a Wizard — not both or neither."
      );
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
      router.push("/register");
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

  const hackerCount = members.filter((m) => m.is_hacker).length;
  const wizardCount = members.filter((m) => m.is_wizard).length;

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
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            flexWrap="wrap"
            mt={4}
            flexDirection="column"
          >
            <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
              {/* <Typography color="red">
                {`Add ${
                  4 - (hackerCount + wizardCount)
                } more members to complete registration of your team `}
              </Typography> */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{
                  minWidth: 140,
                }}
              >
                Save Roles
              </Button>

              {members.length === 1 && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteTeam}
                  sx={{
                    minWidth: 140,
                  }}
                >
                  Delete Team
                </Button>
              )}
            </Box>

            <Button
              variant="outlined"
              onClick={() => setRulebookOpen(true)}
              startIcon={<InfoOutlined />}
              sx={{
                backgroundColor: "red",
                borderColor: "#666",
                color: "#ddd",
                minWidth: 160,
                "&:hover": {
                  borderColor: "#999",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              View Rulebook
            </Button>
          </Box>
        )}

        {isLeader && (
          <Box
            sx={{
              mt: 2,
              mb: 4,
              p: 3,
              backgroundColor: "rgba(17, 17, 17, 0.9)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "12px",
              backdropFilter: "blur(8px)",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1}
              mb={3}
            >
              <Typography variant="h6" fontWeight="bold" color="#FF5555">
                Choose Your Roles
              </Typography>
            </Box>

            <Box
              sx={{
                background:
                  "linear-gradient(90deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.2))",
                border: "1px solid rgba(255, 215, 0, 0.3)",
                borderRadius: "8px",
                p: 2,
                mb: 3,
              }}
            >
              <Typography
                color="#FFD700"
                variant="body1"
                fontWeight="600"
                textAlign="center"
              >
                Your team must have{" "}
                <strong style={{ color: "#FFF" }}>exactly 4 members</strong>{" "}
                consisting of{" "}
                <strong style={{ color: "#FFF" }}>
                  2 Hackers and 2 Wizards
                </strong>
                to complete registration
              </Typography>
            </Box>

            <Box
              display="flex"
              gap={2}
              mb={3}
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  borderRadius: "8px",
                  p: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  color="#FF6B6B"
                  mb={1}
                >
                  Wizards
                </Typography>
                <Typography variant="body2" color="#F1F1F1">
                  Master enchanted logic puzzles and mystical challenges
                </Typography>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "8px",
                  p: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  color="#60A5FA"
                  mb={1}
                >
                  Hackers
                </Typography>
                <Typography variant="body2" color="#F1F1F1">
                  Tackle CTF-style digital security challenges
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                backgroundColor: "rgba(75, 85, 99, 0.5)",
                border: "1px solid rgba(107, 114, 128, 0.3)",
                borderRadius: "8px",
                p: 2,
              }}
            >
              <Typography variant="body2" color="#D1D5DB" textAlign="center">
                <strong style={{ color: "#F3F4F6" }}>Don't worry!</strong> You
                can change these roles later if needed.
              </Typography>
            </Box>
          </Box>
        )}

        {!isLeader && (
          <Box textAlign="center" mt={4}>
            <Button
              variant="outlined"
              onClick={() => setRulebookOpen(true)}
              startIcon={<InfoOutlined />}
              sx={{
                backgroundColor: "red",
                borderColor: "#666",
                color: "#ddd",
                minWidth: 160,
                "&:hover": {
                  borderColor: "#999",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              View Rulebook
            </Button>
          </Box>
        )}
      </Container>

      {/* Rulebook Modal */}
      <Dialog
        open={rulebookOpen}
        onClose={() => setRulebookOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#111",
            border: "2px solid #333",
            borderRadius: "12px",
            maxHeight: "80vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "#111",
            color: "#fff",
            borderBottom: "2px solid #333",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: { xs: "1.25rem", sm: "1.5rem" },
            py: 3,
          }}
        >
          OBSCURA RULEBOOK
        </DialogTitle>
        <DialogContent
          sx={{
            bgcolor: "#111",
            color: "#ddd",
            p: { xs: 2, sm: 3 },
            "& .section": {
              mb: 3,
              p: 2,
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              bgcolor: "rgba(255, 255, 255, 0.05)",
            },
            "& .section-title": {
              color: "#ff6b6b",
              fontWeight: "bold",
              fontSize: { xs: "1rem", sm: "1.1rem" },
              mb: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
            },
            "& .rule-text": {
              fontSize: { xs: "0.85rem", sm: "0.9rem" },
              lineHeight: 1.6,
              color: "#ccc",
            },
            "& .highlight": {
              color: "#60a5fa",
              fontWeight: "600",
            },
            "& .warning": {
              color: "#fbbf24",
              fontWeight: "600",
            },
          }}
        >
          <Box className="section">
            <Typography className="section-title">
              1. TEAM COMPOSITION
            </Typography>
            <Typography className="rule-text">
              • Teams must have exactly{" "}
              <span className="highlight">4 players</span>
              <br />• <span className="highlight">2 Hackers + 2 Wizards</span>
              <br />
              • Roles assigned by Team Leader
              <br />
            </Typography>
          </Box>

          <Box className="section">
            <Typography className="section-title">
              2. JOINING THE GAME
            </Typography>
            <Typography className="rule-text">
              • Each player gets a{" "}
              <span className="highlight">Team Code via email</span>
              <br />
              • Join your team using the code
              <br />• Game starts once{" "}
              <span className="highlight">all 4 players join</span>
            </Typography>
          </Box>

          <Box className="section">
            <Typography className="section-title">3. GAMEPLAY RULES</Typography>
            <Typography className="rule-text">
              • Map split into <span className="highlight">2 sections</span>
              <br />• Hackers and Wizards spawn in{" "}
              <span className="highlight">separate zones</span>
              <br />• Each role faces{" "}
              <span className="highlight">unique puzzles</span>
              <br />• <span className="warning">Teamwork is essential</span> to
              progress
            </Typography>
          </Box>

          <Box className="section">
            <Typography className="section-title">
              4. DEATH & RESPAWN
            </Typography>
            <Typography className="rule-text">
              • If <span className="warning">even one player dies</span>, entire
              team
              <br />
              &nbsp;&nbsp;teleports to spawn point
              <br />• <span className="highlight">No progress is lost</span> —
              regroup and retry
              <br />• Communication is key to survival
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor: "#111",
            borderTop: "2px solid #333",
            p: { xs: 2, sm: 3 },
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => setRulebookOpen(false)}
            variant="contained"
            sx={{
              bgcolor: "#ef4444",
              "&:hover": { bgcolor: "#dc2626" },
              minWidth: 120,
              fontWeight: "bold",
            }}
          >
            Got It!
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default withProtectedRoute(TeamDashboard);
