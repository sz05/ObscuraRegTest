"use client";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const menuItems = [
  { name: "PLAY GAME", path: "/level" },
  { name: "RULEBOOK", path: "/rulebook" },
  { name: "LEADERBOARD", path: "/leaderboard" },
  { name: "MEMBERS", path: "/members" },
  { name: "LOGOUT", path: "/" },
];

export default function Home() {
  const navigate = useNavigate();
  const [hoverIndex, setHoveredIndex] = useState(0);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      setHoveredIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : menuItems.length - 1
      );
    } else if (e.key === "ArrowDown") {
      setHoveredIndex((prevIndex) =>
        prevIndex < menuItems.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "Enter") {
      navigate(menuItems[hoverIndex].path);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hoverIndex]);

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-black w-full h-[80vh] text-white">
        <div className="flex flex-col items-center justify-center w-[50vh]">
          <img src="/assets/text.png" alt="" className="mb-10" />
          <div className="flex items-left justify-center space-y-4 text-xl">
            <div className="home_page_grid">
              {menuItems.map((item, index) => (
                <React.Fragment key={item.name}>
                  {" "}
                  {/* Use item's unique property as key */}
                  <img
                    src="/assets/logo.png"
                    alt="SX Logo"
                    className={`${
                      hoverIndex === index ? "opacity-1" : "opacity-0"
                    } h-10 w-24'`}
                  />
                  <div
                    className="space-x-2 text-3xl mb-4"
                    onMouseEnter={() => setHoveredIndex(index)}
                  >
                    {hoverIndex === index}
                    {item.name != "LOGOUT" && (
                      <Link
                        to={item.path}
                        className={
                          hoverIndex == index ? "text-blue-500" : "text-white"
                        }
                      >
                        {item.name}
                      </Link>
                    )}
                    {item.name == "LOGOUT" && (
                      <div
                        className={"text-red-500 hover:cursor-pointer"}
                        onClick={handleLogout}
                      >
                        <span>{item.name}</span>
                      </div>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="ml-10">
              <img src="/assets/char.png" alt="" className="h-64" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center text-center text-xl">
        <div>
          <p>CCS@2025</p>
          <p>CREATIVE COMPUTING SOCIETY</p>
        </div>
      </div>
    </>
  );
}
