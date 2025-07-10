import CcsLogo from "./_components/CcsLogo";
import ShiftingCountdown from "../components/ui/countdown-timer";

export default function Page() {
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
      {/* Dark overlay for medium and larger screens */}
      <div className="absolute inset-0 bg-black/30 md:bg-black/50 z-10"></div>

      {/* Main content */}
      <div className="flex flex-col items-center relative z-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24">
        {/* CCS Logo */}
        <div className="w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 lg:w-48 lg:h-28 xl:w-56 xl:h-32 mb-4 md:mb-6">
          <CcsLogo className="w-full h-full" />
        </div>
        
        {/* Presents */}
        <h2 className="text-white text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px] font-megarok text-center leading-none tracking-wider drop-shadow-2xl mb-4 md:mb-6 lg:mb-8">
          PRESENTS
        </h2>
        
        {/* Title */}
        <h1 className="text-white text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] xl:text-[250px] font-megarok text-center leading-none tracking-wider drop-shadow-2xl mb-8">
          OBSCURA
        </h1>
        
        {/* Countdown */}
        <ShiftingCountdown />
      </div>
    </div>
  );
}