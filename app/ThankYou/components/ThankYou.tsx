import { useSearchParams } from "next/navigation";
import CCSLogoLarge from "@/app/_components/CCSLogoLarge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ThankYou() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col font-sans">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: "url('/bg_image2.png')" }}
        />
      </div>

      {/* Logo Header */}
      <div className="relative z-10 pt-6 md:pt-8 flex justify-center">
        <CCSLogoLarge />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12 relative z-10">
        <div className="w-full max-w-md mx-auto text-center space-y-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wider font-zen-dots">
            THANK YOU FOR REGISTERING
          </h1>

          <p className="text-red-200 text-base md:text-lg tracking-wide">
            Your team has been successfully created.
          </p>

          <div className="mx-auto max-w-xs rounded-lg border-2 border-red-500 bg-black/80 backdrop-blur-md px-6 py-5 shadow-[0px_0px_20px_6px_rgba(239,68,68,0.35)]">
            <p className="text-red-400 font-bold text-sm mb-2 tracking-widest">
              YOUR TEAM CODE
            </p>
            <p className="text-white text-2xl md:text-3xl font-mono font-bold tracking-widest">
              {code || "ABC123"}
            </p>
          </div>

          <div className="pt-6 md:pt-10">
            <Link href="/Dashboard">
              <Button className="py-5 px-8 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold text-lg shadow-[0_0_15px_4px_rgba(239,68,68,0.4)] transition-all duration-300 rounded-lg tracking-wider">
                GO TO DASHBOARD
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
