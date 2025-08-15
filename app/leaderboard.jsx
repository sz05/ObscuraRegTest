import { useEffect, useState } from "react";
import axios from "axios";

import "../Css/Leader.css";
import { toast } from "react-toastify";
import Pagination from "../Components/Pagination";

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
