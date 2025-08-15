"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import withProtectedRoute from "../_components/ProtectedRoute";

const Levels = () => {
  const [isActive, setIsActive] = useState([false, false, false]);
  const router = useRouter();

  const handleClick = (index) => {
    router.push("/level/" + index);
  };

  const dataLao = async () => {
    try {
      const tokenString = Cookies.get("token").split(",");
      const sesId = tokenString.map((item) => parseInt(item, 10));
      const response = await axios.post(
        "https://api.syrinx.ccstiet.com/teaminfo",
        {
          SessionID: sesId,
        }
      );
      return response.data;
    } catch (e) {
      toast.error("Error fetching data:", e);
    }
  };

  useEffect(() => {
    const datasetting = async () => {
      const data = await dataLao();
      if (data.L) {
        switch (data.L) {
          case 1:
            setIsActive([true, false, false]);
            break;
          case 2:
            setIsActive([false, true, false]);
            break;
          case 3:
            setIsActive([false, false, true]);
            break;
          default:
            console.log("Invalid Level Number");
            break;
        }
      }
    };
    datasetting();
  }, []);

  const handleempty = () => {
    return;
  };
  return (
    <>
      <div className="mt-[20px] text-6xl w-screen text-center">
        Select Level
      </div>
      <div className="flex w-full h-[70vh] justify-center items-center">
        <div className="flex mt-[-13vh] gap-[4vw] ">
          <div
            onClick={() => (isActive[0] ? handleClick(0) : handleempty)}
            className={` h-[40vh] relative w-[18vw] border-[2px] hover:border-white border-black mt-6 bg-green-500 rounded-2xl ${
              !isActive[0]
                ? "grayscale hover:cursor-not-allowed"
                : "hover:cursor-pointer"
            } hover:grayscale-0 hover:scale-105 transition-all duration-200`}
          >
            <img
              src="/assets/bg2.jpeg"
              alt="level1"
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="bg-center absolute inset-0 bg-cover text-3xl text-zinc-900  font-semibold">
              <div className="relative">
                <p className="p-3">LEVEL-1</p>
              </div>
            </div>
            <div className="bg-slate-500  absolute bottom-5 right-5 border border-white px-2 rounded-md py-1 ">
              <button>Play {!isActive[0] && <FaLock />}</button>
            </div>
          </div>
          <div
            onClick={() => (isActive[1] ? handleClick(1) : handleempty)}
            className={` h-[40vh] bottom-[-20vh] relative w-[18vw] border-[2px] hover:border-white border-black  bg-green-500 rounded-2xl ${
              !isActive[1]
                ? "hover:cursor-not-allowed grayscale hover:grayscale-0"
                : "hover:cursor-pointer"
            }  hover:scale-105 transition-all duration-200`}
          >
            <div className="relative h-full">
              <img
                src={"/assets/bg2.jpeg"}
                alt="level2"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="bg-center absolute inset-0 bg-cover text-3xl text-zinc-900  font-semibold">
                <div className="relative">
                  <p className="p-3">LEVEL-2</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-500  absolute bottom-5 right-5 border border-white px-2 rounded-md py-1 ">
              <button>Play {!isActive[1] && <FaLock />}</button>
            </div>
          </div>
          <div
            onClick={() =>
              isActive[2] ? router.push("/112-108-97-121") : handleempty
            }
            className={`h-[40vh] w-[18vw] relative border-[2px] hover:border-white border-black bg-green-500 rounded-2xl ${
              !isActive[2]
                ? "grayscale hover:cursor-not-allowed"
                : "hover:cursor-pointer"
            } hover:grayscale-0 hover:scale-105 transition-all duration-200`}
          >
            <img
              src={"/assets/bg2.jpeg"}
              alt="level3"
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="bg-center absolute inset-0 bg-cover text-3xl text-zinc-900  font-semibold">
              <div className="relative">
                <p className="p-3">LEVEL-3</p>
              </div>
            </div>
            <div className="bg-slate-500  absolute bottom-5 right-5 border border-white px-2 rounded-md py-1 ">
              <button>Play {!isActive[2] && <FaLock />}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withProtectedRoute(Levels);
