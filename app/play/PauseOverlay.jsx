// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import CountdownTimer from "./CountdownTimer";

// function Leaderboard() {
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/leaderboard`, {
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((json) => {
//         setData(json || []);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to load leaderboard");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div className="text-gray-400">Loading...</div>;
//   if (error) return <div className="text-red-400">{error}</div>;
//   if (!data.length)
//     return <div className="text-gray-400">No leaderboard data</div>;

//   return (
//     <ul className="space-y-2">
//       {data.map((entry, i) => (
//         <li key={i} className="flex justify-between text-white">
//           <span>{entry.team_name}</span>
//           <span className="font-mono">{entry.score}</span>
//         </li>
//       ))}
//     </ul>
//   );
// }

// function Announcement() {
//   const [announcement, setAnnouncement] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements`, {
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((json) => {
//         setAnnouncement(json.announcement || "");
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to load announcement");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div className="text-gray-400">Loading...</div>;
//   if (error) return <div className="text-red-400">{error}</div>;
//   if (!announcement)
//     return <div className="text-gray-400">No announcements</div>;

//   return <div className="text-white">{announcement}</div>;
// }

// export default function PauseOverlay({
//   onClose,
//   targetDate,
// }: {
//   onClose: () => void;
//   targetDate: string;
// }) {
//   return (
//     <div className="fixed inset-0 z-50 bg-background/90 flex items-center justify-center">
//       <div className="max-w-2xl w-full rounded-2xl shadow-2xl bg-background border border-border p-12 relative flex flex-col gap-12">
//         <Button
//           onClick={onClose}
//           className="absolute top-8 right-8 text-foreground bg-muted hover:bg-muted/80 rounded-full px-6 py-3 font-bold text-lg shadow-lg"
//         >
//           Resume
//         </Button>
//         <h2 className="text-3xl font-bold text-foreground mb-8 text-center tracking-tight">
//           Paused
//         </h2>
//         <div className="flex flex-col gap-10">
//           <div className="bg-card p-8 rounded-xl shadow mb-4 flex flex-col gap-4">
//             <h4 className="text-xl font-semibold mb-2 text-primary">
//               Leaderboard
//             </h4>
//             <Leaderboard />
//           </div>
//           {/* <div className="bg-card p-8 rounded-xl shadow mb-4 flex flex-col gap-4">
//             <h4 className="text-xl font-semibold mb-2 text-accent">Announcement</h4>
//             <Announcement />
//           </div> */}
//           <div className="bg-card p-8 rounded-xl shadow flex flex-col gap-4 items-center">
//             <h4 className="text-xl font-semibold mb-2 text-blue-500">
//               Time Left
//             </h4>
//             <CountdownTimer targetDate={targetDate} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";

import React from 'react';

function Pagination({ numberOfPages, currentPage, onPageChange }) {
  const pageNumbers = [];
  const maxPagesToShow = 5;

  const createPageNumbers = () => {
    if (numberOfPages <= maxPagesToShow) {
      for (let i = 1; i <= numberOfPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const leftBound = Math.max(1, currentPage - 2);
      const rightBound = Math.min(numberOfPages, currentPage + 2);

      if (leftBound > 1) {
        pageNumbers.push(1);
        if (leftBound > 2) {
          pageNumbers.push('...');
        }
      }

      for (let i = leftBound; i <= rightBound; i++) {
        pageNumbers.push(i);
      }

      if (rightBound < numberOfPages) {
        if (rightBound < numberOfPages - 1) {
          pageNumbers.push('...');
        }
        pageNumbers.push(numberOfPages);
      }
    }
  };

  createPageNumbers();

  return (
    <div className="flex flex-row gap-2 mt-8 mb-4 h-full">
      {pageNumbers.map((number, index) => (
        <button
          key={index}
          onClick={() => number !== '...' && onPageChange(number)}
          className={`pixelated-btn px-4 py-1 text-lg rounded-md ${
            number === currentPage ? 'bg-green-700 text-white' : 'bg-green-500 text-black hover:bg-green-600 hover:text-white'
          }`}
          disabled={number === '...'}
        >
          {number}
        </button>
      ))}
      </div>
  );
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [teamsPerPage] = useState(15);
  const [searchQuery, setSearchQuery] = useState("");

  const dataLao = async () => {
    if (leaderboard.length === 0) {
      try {
        const response = await axios.get(
          "https://api.syrinx.ccstiet.com/leaderboard"
        );
        setLeaderboard(response.data);
      } catch (e) {
        if (e.response) {
          console.log(e.response.data.error);
          toast.error("Error fetching data:", e.response.data.error);
        }
      }
    }
  };

  useEffect(() => {
    dataLao();
    const interval = setInterval(() => {
      dataLao();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Filter teams based on search query
  const filteredTeams = leaderboard.filter((team) =>
    team.N.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page after search
  };

  return (
    <div className="flex flex-col items-center w-full min-h-[150vh] my-4">
      <h1 className="text-5xl mb-5">Leaderboard</h1>
      <h1 className="ml-28 mt-5 text-2xl">{leaderboard[0]?.N}</h1>
      <h1 className="mt-14 mr-[470px] text-2xl">{leaderboard[1]?.N}</h1>
      <h1 className="mt-5 ml-[520px] text-2xl">{leaderboard[2]?.N}</h1>
      <img
        src="assets/leader.png"
        alt=""
        className="h-[250px] absolute mt-[80px] w-[750px]"
      />

      <div className="mt-28 mb-8 bg-[#1f1e1e] py-5 rounded-xl px-5 flex flex-col justify-center w-3/4">
        <div className="flex w-full mb-5">
          <input
            type="text"
            placeholder="Search for your team here..."
            value={searchQuery}
            onChange={(e) => handleChange(e)}
            className="px-3 mx-24 py-2 border-white border-2 rounded-md text-white bg-transparent active:border-white focus:border-white active:border-2 focus:border-2 w-full"
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>RANK</th>
              <th>TEAM NAME</th>
              <th>SCORE</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto h-20">
            {currentTeams.map((team, index) => {
              const globalIndex = leaderboard.findIndex((t) => t.N === team.N);
              return (
                <tr
                  key={index}
                  className={
                    globalIndex === 0
                      ? "first-place"
                      : globalIndex === 1
                      ? "second-place"
                      : globalIndex === 2
                      ? "third-place"
                      : ""
                  }
                >
                  <td>{indexOfFirstTeam + index + 1}</td>
                  <td>{team.N}</td>
                  <td>{team.P}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex w-full justify-center">
          <Pagination
            numberOfPages={Math.ceil(filteredTeams.length / teamsPerPage)}
            currentPage={currentPage}
            onPageChange={paginate}
          />
        </div>
      </div>
    </div>
  );
}
