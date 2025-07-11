"use client";

import { useSearchParams } from "next/navigation";
import CCSLogoLarge from "../_components/CCSLogoLarge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col">
      {/* Circuit background */}
      <div className="absolute inset-0 opacity-30">
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
      </div>

      {/* Logo Header */}
      <div className="relative z-10 pt-6 md:pt-8 flex justify-center">
        <CCSLogoLarge />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12 relative z-10">
        <div className="w-full max-w-md mx-auto text-center space-y-6 md:space-y-8">
          <h1 
            className="text-white text-3xl md:text-5xl font-bold tracking-wider"
            style={{ fontFamily: "megarok" }}
          >
            THANK YOU FOR REGISTERING
          </h1>

          <p className="text-white/80 text-base md:text-lg tracking-wide">
            Your team has been successfully created.
          </p>

          <div className="mx-auto max-w-xs rounded-lg border-2 border-purple-500 bg-black/80 backdrop-blur-md px-6 py-5 
            shadow-[0px_0px_15px_5px_rgba(168,85,247,0.35)]">
            <p className="text-purple-400 font-bold text-sm mb-2">YOUR TEAM CODE</p>
            <p className="text-white text-2xl md:text-3xl font-mono font-bold tracking-wider">
              {code || "ABC123"}
            </p>
          </div>

          <div className="pt-6 md:pt-8">
            <Link href="/Dashboard">
              <Button 
                className="py-6 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700
                  text-white font-bold text-lg shadow-lg shadow-purple-600/30 border-none transition-all duration-300"
              >
                GO TO DASHBOARD
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
