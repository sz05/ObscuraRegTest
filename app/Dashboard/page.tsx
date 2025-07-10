"use client";
import { Box, Container, Typography, Card, TextField } from "@mui/material";
import CcsLogo from "../_components/CcsLogo";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

type Role = "WIZARD" | "HACKER";
type MemberRoles = {
  [key: number]: Role;
};

export default function TeamDashboard() {
  const [memberRoles, setMemberRoles] = useState<MemberRoles>({
    1: "WIZARD",
    2: "HACKER",
    3: "WIZARD",
    4: "HACKER",
  });

  const handleRoleChange = (memberId: number, newRole: Role | null) => {
    if (newRole !== null) {
      setMemberRoles((prev) => ({
        ...prev,
        [memberId]: newRole,
      }));
    }
  };

  return (
    <Box className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4 pb-32">
      <Box className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern
              id="circuit"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M20 20h60v20h-20v20h-20v20h-20z"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
              />
              <path
                d="M80 40h-20v20h20v20h-40v-20h-20"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </Box>

      <Container maxWidth="sm" className="relative z-10">
        <Box display="flex" justifyContent="center">
          <CcsLogo />
        </Box>

        <Box className="text-center" mb={4}>
          <Typography
            mb={2}
            className="text-white text-2xl md:text-4xl font-bold mb-4 md:mb-6 tracking-wider"
            sx={{ fontFamily: "monospace" }}
          >
            Leader
          </Typography>
          <Card
            sx={{
              bgcolor: "black",
              boxShadow: "0px 0px 5px 5px #FF0000",
            }}
            className="w-full bg-gray-200 border-none p-3 md:p-4 space-y-2 md:space-y-3"
          >
            <Box className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <Typography
                className="text-red-500 font-bold text-xs md:text-sm"
                sx={{ fontFamily: "monospace" }}
              >
                NAME:
              </Typography>
              <Typography
                className="text-red-500 font-bold text-xs md:text-sm"
                sx={{ fontFamily: "monospace" }}
              >
                DHOLU PANCHO YADHU
              </Typography>
            </Box>
            <Box className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <Typography
                className="text-red-500 font-bold text-xs md:text-sm"
                sx={{ fontFamily: "monospace" }}
              >
                EMAIL:
              </Typography>
              <Typography
                className="text-red-500 font-bold text-xs md:text-sm break-all"
                sx={{ fontFamily: "monospace" }}
              >
                DHOLU.THAPPAD.COM
              </Typography>
            </Box>
            <Box className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <Typography
                className="text-red-500 font-bold text-xs md:text-sm"
                sx={{ fontFamily: "monospace" }}
              >
                PHONE NO:
              </Typography>
              <Typography
                className="text-red-500 font-bold text-xs md:text-sm"
                sx={{ fontFamily: "monospace" }}
              >
                123456789
              </Typography>
            </Box>
            <Box className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <Typography
                className="text-red-500 font-bold text-xs md:text-sm"
                sx={{ fontFamily: "monospace" }}
              >
                ROLE:
              </Typography>
              <div className="w-full flex flex-col sm:flex-row  gap-2">
                <ToggleButtonGroup
                  exclusive
                  value={memberRoles[1]}
                  onChange={(event, newRole) => handleRoleChange(1, newRole)}
                  sx={{
                    border: "2px solid #1a1a1a",
                    borderRadius: "6px",
                    backgroundColor: "#0a0a0a",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "0.5rem",
                    "& .MuiToggleButton-root": {
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      fontSize: "0.75rem",
                      color: "#ffffff",
                      borderColor: "#333333",
                      backgroundColor: "#1a1a1a",
                      padding: "6px 12px",
                      flex: "1 1 40%", // Makes them stack on small widths
                      minWidth: "100px",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#2a2a2a",
                        borderColor: "#dc2626",
                        color: "#ffffff",
                        transform: "translateY(-1px)",
                        boxShadow: "0 2px 8px rgba(220, 38, 38, 0.3)",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "#dc2626",
                        color: "#ffffff",
                        borderColor: "#dc2626",
                        boxShadow:
                          "0 0 10px rgba(220, 38, 38, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                        "&:hover": {
                          backgroundColor: "#b91c1c",
                          borderColor: "#b91c1c",
                          transform: "translateY(-1px)",
                          boxShadow:
                            "0 4px 12px rgba(220, 38, 38, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                        },
                      },
                    },
                  }}
                >
                  <ToggleButton value="WIZARD">WIZARD</ToggleButton>
                  <ToggleButton value="HACKER">HACKER</ToggleButton>
                </ToggleButtonGroup>
              </div>
            </Box>
          </Card>
        </Box>

        <Box className="space-y-6 md:space-y-8">
          {[2, 3, 4].map((memberNum) => (
            <Box key={memberNum} className="text-center">
              <Typography
                mb={2}
                className="text-white text-2xl md:text-4xl font-bold mb-4 md:mb-6 tracking-wider"
                sx={{ fontFamily: "monospace" }}
              >
                MEMBER {memberNum}
              </Typography>
              <Card
                sx={{ boxShadow: "0px 0px 5px 5px #FF0000" }}
                className="w-full bg-gray-200 border-none p-3 md:p-4 space-y-2 md:space-y-3"
              >
                <Box className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <Typography
                    className="text-black font-bold text-xs md:text-sm"
                    sx={{ fontFamily: "monospace" }}
                  >
                    NAME:
                  </Typography>
                  <Typography
                    className="text-black font-bold text-xs md:text-sm"
                    sx={{ fontFamily: "monospace" }}
                  >
                    DHOLU PANCHO YADHU
                  </Typography>
                </Box>
                <Box className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <Typography
                    className="text-black font-bold text-xs md:text-sm"
                    sx={{ fontFamily: "monospace" }}
                  >
                    EMAIL:
                  </Typography>
                  <Typography
                    className="text-black font-bold text-xs md:text-sm break-all"
                    sx={{ fontFamily: "monospace" }}
                  >
                    DHOLU.THAPPAD.COM
                  </Typography>
                </Box>
                <Box className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <Typography
                    className="text-black font-bold text-xs md:text-sm"
                    sx={{ fontFamily: "monospace" }}
                  >
                    PHONE NO:
                  </Typography>
                  <Typography
                    className="text-black font-bold text-xs md:text-sm"
                    sx={{ fontFamily: "monospace" }}
                  >
                    123456789
                  </Typography>
                </Box>
                <Box className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <Typography
                    className="text-black font-bold text-xs md:text-sm"
                    sx={{ fontFamily: "monospace" }}
                  >
                    ROLE:
                  </Typography>
                  <div className="w-full flex flex-col sm:flex-row gap-2">
                    <ToggleButtonGroup
                      exclusive
                      value={memberRoles[memberNum]}
                      onChange={(event, newRole) =>
                        handleRoleChange(memberNum, newRole)
                      }
                      sx={{
                        border: "2px solid #1a1a1a",
                        borderRadius: "6px",
                        backgroundColor: "#0a0a0a",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: "0.5rem",
                        "& .MuiToggleButton-root": {
                          fontFamily: "monospace",
                          fontWeight: "bold",
                          fontSize: "0.75rem",
                          color: "#ffffff",
                          borderColor: "#333333",
                          backgroundColor: "#1a1a1a",
                          padding: "6px 12px",
                          flex: "1 1 40%", // Makes them stack on small widths
                          minWidth: "100px",
                          transition: "all 0.2s ease-in-out",
                          "&:hover": {
                            backgroundColor: "#2a2a2a",
                            borderColor: "#dc2626",
                            color: "#ffffff",
                            transform: "translateY(-1px)",
                            boxShadow: "0 2px 8px rgba(220, 38, 38, 0.3)",
                          },
                          "&.Mui-selected": {
                            backgroundColor: "#dc2626",
                            color: "#ffffff",
                            borderColor: "#dc2626",
                            boxShadow:
                              "0 0 10px rgba(220, 38, 38, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                            "&:hover": {
                              backgroundColor: "#b91c1c",
                              borderColor: "#b91c1c",
                              transform: "translateY(-1px)",
                              boxShadow:
                                "0 4px 12px rgba(220, 38, 38, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                            },
                          },
                        },
                      }}
                    >
                      <ToggleButton value="WIZARD">WIZARD</ToggleButton>
                      <ToggleButton value="HACKER">HACKER</ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
