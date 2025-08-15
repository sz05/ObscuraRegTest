"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CountdownTimer from "./CountdownTimer";

function Leaderboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/leaderboard`,
          {
            credentials: "include",
          }
        );
        const json = await res.json();
        console.log("start");
        console.log("Leaderboard response:", json);
        console.log("end");
        if (Array.isArray(json)) {
          setData(json);
        } else {
          throw new Error("Response is not an array");
        }
      } catch (e) {
        setError("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [data]);

  if (loading) return <div className="text-gray-400">Loading...</div>;
  if (error) return <div className="text-red-400">{error}</div>;
  if (!Array.isArray(data) || data.length === 0)
    return <div className="text-gray-400">No leaderboard data</div>;

  return (
    <ul className="space-y-2">
      <li className="flex justify-between text-gray-400 font-semibold">
        <span>Team</span>
        <span>Points</span>
        <span>Level</span>
        <span>Cleared</span>
        <span>Solved</span>
      </li>
      {data.map((entry, index) => (
        <li key={index} className="flex justify-between text-white">
          <span>{entry.team_code}</span>
          <span className="font-mono">{entry.Points}</span>
          <span className="font-mono">{entry.Current_level ?? "N/A"}</span>
          <span className="font-mono">{entry.Levels_Cleared ?? "N/A"}</span>
          <span className="font-mono">{entry.Question_solved}</span>
        </li>
      ))}
    </ul>
  );
}

function Announcement() {
  const [announcement, setAnnouncement] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        setAnnouncement(json.announcement || "");
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load announcement");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-gray-400">Loading...</div>;
  if (error) return <div className="text-red-400">{error}</div>;
  if (!announcement)
    return <div className="text-gray-400">No announcements</div>;

  return <div className="text-white">{announcement}</div>;
}

export default function PauseOverlay({
  onClose,
  targetDate,
}: {
  onClose: () => void;
  targetDate: string;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-background/90 flex items-center justify-center">
      <div className="max-w-2xl w-full rounded-2xl shadow-2xl bg-background border border-border p-12 relative flex flex-col gap-12">
        <Button
          onClick={onClose}
          className="absolute top-8 right-8 text-foreground bg-muted hover:bg-muted/80 rounded-full px-6 py-3 font-bold text-lg shadow-lg"
        >
          Resume
        </Button>
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center tracking-tight">
          Paused
        </h2>
        <div className="flex flex-col gap-10">
          <div className="bg-card p-8 rounded-xl shadow mb-4 flex flex-col gap-4">
            <h4 className="text-xl font-semibold mb-2 text-primary">
              Leaderboard
            </h4>
            <Leaderboard />
          </div>
          {/* <div className="bg-card p-8 rounded-xl shadow mb-4 flex flex-col gap-4">
            <h4 className="text-xl font-semibold mb-2 text-accent">Announcement</h4>
            <Announcement />
          </div> */}
          <div className="bg-card p-8 rounded-xl shadow flex flex-col gap-4 items-center">
            <h4 className="text-xl font-semibold mb-2 text-blue-500">
              Time Left
            </h4>
            <CountdownTimer targetDate={targetDate} />
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import { useState, useEffect, use as reactUse } from "react";
// // import { useParams } from "react-router-dom";
// // import { games } from "../Config/gdConfig";

// import axios from "axios";
// import { toast } from "react-toastify";
// import Pagination from "../../_components/Pagination";
// import { FaPause } from "react-icons/fa";

// // import "../Css/Leader.css";
// import "../../_components/Css/Leader.css";

// export default function Level({ params }) {
//   const { id } = reactUse(params);

//   let gameId = parseInt(id, 10);
//   // console.log(games[gameId])
//   const [isPaused, setIsPaused] = useState(false);
//   const [leaderboard, setLeaderboard] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [teamsPerPage] = useState(10);
//   const [searchQuery, setSearchQuery] = useState("");

//   const dataLao = async () => {
//     if (leaderboard.length === 0) {
//       try {
//         const response = await axios.get(
//           "https://api.syrinx.ccstiet.com/leaderboard"
//         );
//         setLeaderboard(response.data);
//       } catch (e) {
//         if (e.response) {
//           console.log(e.response.data.error);
//           toast.error("Error fetching data:", e.response.data.error);
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     dataLao();
//     const interval = setInterval(() => {
//       dataLao();
//     }, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   // Filter teams based on search query
//   const filteredTeams = leaderboard.filter((team) =>
//     team.N.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Pagination logic
//   const indexOfLastTeam = currentPage * teamsPerPage;
//   const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
//   const currentTeams = filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleChange = (e) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1); // Reset to the first page after search
//   };

//   return (
//     <div className="relative w-full h-full">
//       <div className="absolute z-10">
//         {/* Down below you will need to write code for the Pause screen */}
//         {isPaused && (
//           <div className="z-40 w-screen h-screen transition-all bg-black bg-opacity-80 flex items-center justify-center">
//             <div className="bg-[#1f1e1e] py-5 rounded-xl px-5 flex flex-col justify-center w-3/4 max-w-3xl">
//               <h1 className="text-3xl font-bold text-white text-center mb-6">
//                 Leaderboard
//               </h1>
//               <div className="flex w-full mb-5">
//                 <input
//                   type="text"
//                   placeholder="Search for your team here..."
//                   value={searchQuery}
//                   onChange={(e) => handleChange(e)}
//                   className="px-3 py-2 border-white border-2 rounded-md text-white bg-transparent active:border-white focus:border-white active:border-2 focus:border-2 w-full"
//                 />
//               </div>
//               <table className="w-full">
//                 <thead>
//                   <tr>
//                     <th>RANK</th>
//                     <th>TEAM NAME</th>
//                     <th>SCORE</th>
//                   </tr>
//                 </thead>
//                 <tbody className="overflow-y-auto max-h-60">
//                   {currentTeams.map((team, index) => {
//                     const globalIndex = leaderboard.findIndex(
//                       (t) => t.N === team.N
//                     );
//                     return (
//                       <tr
//                         key={index}
//                         className={
//                           globalIndex === 0
//                             ? "first-place"
//                             : globalIndex === 1
//                             ? "second-place"
//                             : globalIndex === 2
//                             ? "third-place"
//                             : ""
//                         }
//                       >
//                         <td className="text-center">
//                           {indexOfFirstTeam + index + 1}
//                         </td>
//                         <td className="text-center">{team.N}</td>
//                         <td className="text-center">{team.P}</td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//               <div className="flex w-full justify-center mt-4">
//                 <Pagination
//                   numberOfPages={Math.ceil(filteredTeams.length / teamsPerPage)}
//                   currentPage={currentPage}
//                   onPageChange={paginate}
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
