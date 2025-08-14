import { useRouter } from "next/navigation";
import CCSLogoLarge from "./CCSLogoLarge";

const Logos = () => {
  const router = useRouter();

  const handleHomeNavigation = () => {
    router.push("/");
  };

  return (
      <div className="w-full flex justify-between items-center z-10 px-1 py-1 sm:px-2 sm:py-1 md:px-0 md:py-6">
        {/* CCS Logo - Left side */}
        <div
            onClick={handleHomeNavigation}
            className="cursor-pointer flex items-center transform scale-50 sm:scale-60 md:scale-90 lg:scale-100 origin-left transition-all duration-300 ease-in-out hover:scale-55 sm:hover:scale-65 md:hover:scale-95 lg:hover:scale-105"
        >
          <CCSLogoLarge />
        </div>

        {/* Frosh Logo - Right side */}
        <img
            onClick={handleHomeNavigation}
            src="/froshLogo.png"
            alt="Frosh Logo"
            className="cursor-pointer w-20 sm:w-24 md:w-44 lg:w-48 xl:w-52 h-auto object-contain transition-transform duration-300 ease-in-out hover:scale-102 sm:hover:scale-103 md:hover:scale-105 drop-shadow-sm"
        />
      </div>
  );
};

export default Logos;