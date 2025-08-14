"use client";
import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { games } from "../Config/gdConfig";

import games from "../../_components/Config/gdConfig.js"
import axios from "axios";
import { toast } from "react-toastify";
import Pagination from "../../_components/Pagination";
import { FaPause } from "react-icons/fa";
import GdLoader from "../../_components/godot/gdLoader.jsx";

// import "../Css/Leader.css";
import "../../_components/Css/Leader.css";

export default function Level({ params }) {
  const { id } = params;

  let gameId = parseInt(id, 10);
  console.log(gameId)

  console.log(games[gameId])
  const [isPaused, setIsPaused] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [teamsPerPage] = useState(10);
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
    }, 10000);

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
    <div className="relative w-full h-full">
      <button
        className="absolute top-[3vh] left-[3vw] z-50 pixelated-button"
        onClick={() => setIsPaused(!isPaused)}
      >
        <FaPause className="text-black" />
      </button>
      <div className="absolute z-10">
        {/* Down below you will need to write code for the Pause screen */}
        {isPaused && (
          <div className="z-40 w-screen h-screen transition-all bg-black bg-opacity-80 flex items-center justify-center">
            <div className="bg-[#1f1e1e] py-5 rounded-xl px-5 flex flex-col justify-center w-3/4 max-w-3xl">
              <h1 className="text-3xl font-bold text-white text-center mb-6">
                Leaderboard
              </h1>
              <div className="flex w-full mb-5">
                <input
                  type="text"
                  placeholder="Search for your team here..."
                  value={searchQuery}
                  onChange={(e) => handleChange(e)}
                  className="px-3 py-2 border-white border-2 rounded-md text-white bg-transparent active:border-white focus:border-white active:border-2 focus:border-2 w-full"
                />
              </div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th>RANK</th>
                    <th>TEAM NAME</th>
                    <th>SCORE</th>
                  </tr>
                </thead>
                <tbody className="overflow-y-auto max-h-60">
                  {currentTeams.map((team, index) => {
                    const globalIndex = leaderboard.findIndex(
                      (t) => t.N === team.N
                    );
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
                        <td className="text-center">
                          {indexOfFirstTeam + index + 1}
                        </td>
                        <td className="text-center">{team.N}</td>
                        <td className="text-center">{team.P}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex w-full justify-center mt-4">
                <Pagination
                  numberOfPages={Math.ceil(filteredTeams.length / teamsPerPage)}
                  currentPage={currentPage}
                  onPageChange={paginate}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <GdLoader gdConfig={games[gameId]} />
    </div>
  );
}
