"use client";

import CcsLogo from "./_components/CcsLogo";
import ShiftingCountdown from "../components/ui/countdown-timer";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/bg_image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/30 md:bg-black/50 z-10"></div>

      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30">
        <button
          onClick={() => router.push("/sponsors")}
          className="px-3 py-2 sm:px-4 sm:py-2 border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300"
        >
          <span className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl font-['GothamXNarrow'] uppercase tracking-wide">
            Our Sponsors
          </span>
        </button>
      </div>

      <div className="relative z-20 flex flex-col flex-grow px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-12 md:pt-16 lg:pt-20 justify-between sm:justify-center">
        <div className="flex flex-col items-center text-center gap-2 sm:gap-4 md:gap-6 pt-8 sm:pt-0">
          <div className="w-20 h-14 sm:w-28 sm:h-18 md:w-36 md:h-22 lg:w-44 lg:h-26 xl:w-52 xl:h-32">
            <CcsLogo className="w-full h-full" />
          </div>

          <h2 className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-['Megarok'] leading-none tracking-wider drop-shadow-2xl">
            PRESENTS
          </h2>

          <h1 className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-['Megarok'] leading-none tracking-wider drop-shadow-2xl">
            OBSCURA
          </h1>

          <div className="mt-4 sm:mt-6">
            <ShiftingCountdown />
          </div>
        </div>

        <div className="flex flex-col items-center pb-8 sm:pb-0 sm:mt-8">
          <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-xs sm:max-w-sm">
            <button
              onClick={() => router.push("/story")}
              className="w-full px-6 py-3 sm:px-8 sm:py-4 rounded-lg bg-[#ff3300] text-white font-bold text-sm sm:text-base md:text-lg font-['GothamXNarrow'] uppercase tracking-wide transition-all duration-300 ease-in-out shadow-[0_0_20px_4px_rgba(255,51,0,0.6),0_0_40px_8px_rgba(255,100,0,0.4)] hover:bg-[#ff5500] hover:shadow-[0_0_10px_8px_rgba(255,100,0,0.8),0_0_30px_12px_rgba(255,150,0,0.6)]"
            >
              Register Now
            </button>

            <button
              onClick={() => router.push("/Dashboard")}
              className="w-full px-6 py-3 sm:px-8 sm:py-4 rounded-lg bg-[#ff3300] text-white font-bold text-sm sm:text-base md:text-lg font-['GothamXNarrow'] uppercase tracking-wide transition-all duration-300 ease-in-out shadow-[0_0_30px_8px_rgba(255,100,0,0.8),0_0_60px_12px_rgba(255,150,0,0.6)] hover:bg-[#ff5500] hover:shadow-[0_0_10px_8px_rgba(255,100,0,0.8),0_0_30px_12px_rgba(255,150,0,0.6)]"
            >
              Team Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
