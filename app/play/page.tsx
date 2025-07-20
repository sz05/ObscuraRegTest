"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PanelRightOpen, Pause, Play } from "lucide-react";

import PauseOverlay from "./PauseOverlay";
import CountdownTimer from "./CountdownTimer";
import { useRouter } from "next/navigation";

const isMobileDevice = () => {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent;
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) ||
    window.innerWidth < 900
  );
};

const router = useRouter();

const Game = () => {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    router.push("/");
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPaused(true);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const router = useRouter();

  const checkRegistered = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkRegistered`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      if (data.registered === false) {
        alert("You are not part of a team!");
        router.push("/");
      }
    } catch {
      // alert("Failed");
    }
  };
  useEffect(() => {
    checkRegistered();
  }, []);

  // Mobile view
  if (isMobile) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md mx-auto p-8 text-center shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Laptop/Desktop Required</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg text-foreground font-semibold mb-4">
              Please open this game from a laptop or desktop device.
              <br />
              Mobile gameplay is not supported.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Desktop view
  return (
    <div className="w-screen h-screen overflow-hidden bg-background relative">
      {/* Pause Button Top Center */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30">
        <Button
          variant="outline"
          onClick={() => setPaused(true)}
          className="text-xl px-8 py-5 flex items-center gap-2"
        >
          <Pause className="w-5 h-5 mr-2" /> Pause
        </Button>
      </div>

      {/* Pause Overlay */}
      {paused && (
        <PauseOverlay
          onClose={() => setPaused(false)}
          targetDate="2025-07-21T00:00:00+05:30"
        />
      )}

      {/* Fullscreen Game Iframe */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <iframe
            src="https://obscura-demo.ccstiet.com/"
            title="Obscura Demo Game"
            className="w-full h-full min-h-[600px] bg-black border-none rounded-xl"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default Game;
