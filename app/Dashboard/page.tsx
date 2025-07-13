// "use client";

// import {
//   Box,
//   Button,
//   Card,
//   Container,
//   Typography,
//   ToggleButton,
//   ToggleButtonGroup,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import { ContentCopy } from "@mui/icons-material";
// import { useEffect, useState } from "react";
// import CCSLogoLarge from "../_components/CCSLogoLarge";
// import withProtectedRoute from "../_components/ProtectedRoute";

// type Role = "WIZARD" | "HACKER";

// type Member = {
//   email: string;
//   name: string;
//   discord_id: string;
//   id: string;
//   is_wizard: boolean;
//   is_hacker: boolean;
// };

// function TeamDashboard() {
//   const [members, setMembers] = useState<Member[]>([]);
//   const [teamCode, setTeamCode] = useState("");
//   const [isLeader, setIsLeader] = useState(false);
//   const [copied, setCopied] = useState(false);

//   const fetchDashboard = async () => {
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/team-dashboard`,
//         {
//           credentials: "include",
//         }
//       );
//       const data = await res.json();
//       console.log(data);
//       if (!res.ok) throw new Error(data.error);

//       const players: Member[] = data.players.map((p: any) => ({
//         name: p.name,
//         email: p.email,
//         discord_id: p.discord_id,
//         id: p.id,
//         is_wizard: p.is_wizard ?? false,
//         is_hacker: p.is_hacker ?? true,
//       }));

//       setMembers(players);
//       setTeamCode(data.team_code);
//       setIsLeader(data.is_leader);
//     } catch {
//       alert("Failed to load dashboard.");
//     }
//   };

//   const handleRoleChange = (index: number, role: Role | null) => {
//     if (!role) return;

//     const hackerCount = members.filter((m) => m.is_hacker).length;
//     const wizardCount = members.filter((m) => m.is_wizard).length;

//     const isCurrentlyHacker = members[index].is_hacker;
//     const isCurrentlyWizard = members[index].is_wizard;

//     if (role === "HACKER" && hackerCount >= 2 && !isCurrentlyHacker) return;
//     if (role === "WIZARD" && wizardCount >= 2 && !isCurrentlyWizard) return;

//     setMembers((prev) =>
//       prev.map((m, i) =>
//         i === index
//           ? {
//               ...m,
//               is_hacker: role === "HACKER",
//               is_wizard: role === "WIZARD",
//             }
//           : m
//       )
//     );
//   };

//   const handleSave = async () => {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/team-dashboard`,
//       {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ team_code: teamCode, players: members }),
//       }
//     );
//     console.log(JSON.stringify({ team_code: teamCode, players: members }));

//     const data = await res.json();
//     if (!res.ok) alert(data.error || "Save failed");
//     else alert("Roles saved successfully!");
//   };

//   const handleLogout = async () => {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`, {
//       method: "POST",
//       credentials: "include",
//     });

//     const data = await res.json();
//     if (!res.ok) alert("Logout failed");
//     else window.location.href = "/";
//   };

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   const getRole = (member: Member) => (member.is_hacker ? "HACKER" : "WIZARD");

//   // Use local images for avatars - alternating between scarra and scurra based on index
//   const getAvatarUrl = (role: string) =>
//     // index % 2 === 0 ? "/scarra.png" : "/scurra.png";
//     role === "WIZARD" ? "scarra.png" : "scurra.png";

//   const renderCard = (member: Member, index: number, label: string) => {
//     const role = getRole(member);
//     const bgColor = role === "HACKER" ? "#1E3A8A" : "#7F1D1D"; // blue/red
//     const badgeColor = role === "HACKER" ? "#3B82F6" : "#EF4444";

//     return (
//       <Card
//         key={index}
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           bgcolor: "#111",
//           border: `2px solid ${badgeColor}`,
//           borderRadius: "12px",
//           padding: { xs: "0.8rem", sm: "1rem" },
//           marginBottom: "1.5rem",
//           flexWrap: "wrap",
//           flexDirection: { xs: "column", sm: "row" },
//           gap: { xs: 1, sm: 0 },
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             width: { xs: "100%", sm: "auto" },
//             flex: { xs: "none", sm: "1 1 auto" },
//             gap: 2,
//           }}
//         >
//           <Box
//             sx={{
//               width: { xs: 50, sm: 60 },
//               height: { xs: 50, sm: 60 },
//               minWidth: { xs: 50, sm: 60 },
//               borderRadius: "8px",
//               overflow: "hidden",
//               backgroundColor: "#000",
//             }}
//           >
//             <img
//               src={getAvatarUrl(role)}
//               alt="avatar"
//               width="100%"
//               height="100%"
//               className="object-cover"
//             />
//           </Box>

//           <Box sx={{ flex: "1 1 auto", color: "white", minWidth: 0 }}>
//             <Typography
//               fontWeight={600}
//               sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
//             >
//               {member.name}
//             </Typography>
//             <Typography
//               variant="body2"
//               color="gray"
//               sx={{
//                 fontSize: { xs: "0.75rem", sm: "0.875rem" },
//                 wordBreak: "break-all",
//               }}
//             >
//               {member.email}
//             </Typography>
//             <Typography
//               variant="body2"
//               color="gray"
//               sx={{
//                 fontSize: { xs: "0.7rem", sm: "0.8rem" },
//                 wordBreak: "break-all",
//               }}
//             >
//               Discord: {member.discord_id || "Not provided"}
//             </Typography>
//           </Box>
//         </Box>

//         {isLeader ? (
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               width: { xs: "100%", sm: "auto" },
//               justifyContent: { xs: "center", sm: "flex-end" },
//               mt: { xs: 1, sm: 0 },
//             }}
//           >
//             <ToggleButtonGroup
//               value={role}
//               exclusive
//               onChange={(e, r) => handleRoleChange(index, r)}
//               sx={{
//                 bgcolor: "#1a1a1a",
//                 borderRadius: 2,
//                 "& .MuiToggleButton-root": {
//                   color: "#fff",
//                   borderColor: "#333",
//                   fontSize: { xs: "0.75rem", sm: "0.875rem" },
//                   px: { xs: 1.5, sm: 2 },
//                   py: { xs: 0.5, sm: 0.75 },
//                   "&.Mui-selected": {
//                     bgcolor: badgeColor,
//                     borderColor: badgeColor,
//                   },
//                 },
//               }}
//             >
//               <ToggleButton value="HACKER">Hacker</ToggleButton>
//               <ToggleButton value="WIZARD">Wizard</ToggleButton>
//             </ToggleButtonGroup>
//           </Box>
//         ) : (
//           <Box
//             sx={{
//               width: { xs: "100%", sm: "auto" },
//               display: "flex",
//               justifyContent: { xs: "center", sm: "flex-end" },
//               mt: { xs: 1, sm: 0 },
//             }}
//           >
//             <Box
//               sx={{
//                 backgroundColor: badgeColor,
//                 color: "white",
//                 fontWeight: "bold",
//                 px: { xs: 2, sm: 2 },
//                 py: { xs: 0.5, sm: 0.5 },
//                 borderRadius: "8px",
//                 fontSize: { xs: "0.8rem", sm: "0.875rem" },
//               }}
//             >
//               {role}
//             </Box>
//           </Box>
//         )}
//       </Card>
//     );
//   };

//   return (
//     <Box
//       className="min-h-screen flex flex-col items-center justify-start p-4 pb-32 relative"
//       sx={{
//         backgroundImage: "url('/bg_image_old.png')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       {/* Dark overlay to dim the background */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: "rgba(0, 0, 0, 0.65)", // Dimming overlay
//           zIndex: 0,
//         }}
//       />

//       <Box
//         width="100%"
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={4}
//         sx={{ position: "relative", zIndex: 1 }}
//       >
//         <Box sx={{ width: { xs: "120px", sm: "150px" } }}>
//           <CCSLogoLarge />
//         </Box>
//         <Button
//           onClick={handleLogout}
//           color="error"
//           variant="contained"
//           size="small"
//           sx={{
//             textTransform: "none",
//             fontSize: { xs: "0.8rem", sm: "0.875rem" },
//             px: { xs: 2, sm: 3 },
//             py: { xs: 0.5, sm: 1 },
//           }}
//         >
//           Logout
//         </Button>
//       </Box>

//       <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
//         <Box textAlign="center" mb={3}>
//           <Typography
//             variant="h6"
//             fontWeight="bold"
//             color="red"
//             sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
//           >
//             TEAM CODE
//           </Typography>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: 1,
//             }}
//           >
//             <Typography
//               variant="h4"
//               fontWeight="bold"
//               color="white"
//               sx={{
//                 fontSize: { xs: "1.5rem", sm: "2.125rem" },
//                 wordBreak: "break-all",
//               }}
//             >
//               {teamCode}
//             </Typography>
//             <Tooltip title={copied ? "Copied!" : "Copy"}>
//               <IconButton
//                 size="small"
//                 onClick={() => {
//                   navigator.clipboard.writeText(teamCode);
//                   setCopied(true);
//                   setTimeout(() => setCopied(false), 1000);
//                 }}
//               >
//                 <ContentCopy
//                   sx={{
//                     color: "white",
//                     fontSize: { xs: "0.9rem", sm: "1rem" },
//                   }}
//                 />
//               </IconButton>
//             </Tooltip>
//           </Box>
//         </Box>

//         {members.map((member, i) =>
//           renderCard(member, i, i === 0 ? "LEADER" : `MEMBER ${i}`)
//         )}

//         {isLeader && (
//           <Box textAlign="center" mt={4}>
//             <Button variant="contained" color="error" onClick={handleSave}>
//               SAVE ROLES
//             </Button>
//           </Box>
//         )}
//       </Container>
//     </Box>
//   );
// }

// export default withProtectedRoute(TeamDashboard);

// Updated TeamDashboard.tsx with dropdowns, toast, kick/leave, and validation
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

type Role = "WIZARD" | "HACKER";

type Member = {
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

  const handleSave = async () => {
    const hackerCount = members.filter((m) => m.is_hacker).length;
    const wizardCount = members.filter((m) => m.is_wizard).length;

    if (hackerCount !== 2 || wizardCount !== 2) {
      toast.error("Please assign exactly 2 Hackers and 2 Wizards.");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/team-dashboard`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ team_code: teamCode, players: members }),
      }
    );

    const data = await res.json();
    if (!res.ok) toast.error(data.error || "Save failed");
    else toast.success("Roles saved successfully!");
  };

  const handleKick = async (email: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/kick`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (!res.ok) toast.error(data.error || "Kick failed");
    else {
      toast.success("Member kicked!");
      fetchDashboard();
    }
  };

  const handleLeave = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/leave`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) toast.error("Leave failed");
    else window.location.href = "/";
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
              {index !== 0 && (
                <Button size="small" color="warning" onClick={handleLeave}>
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
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default withProtectedRoute(TeamDashboard);
