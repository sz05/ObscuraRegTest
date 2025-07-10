// "use client";

// import CcsLogo from "./_components/CcsLogo";
// import ShiftingCountdown from "../components/ui/countdown-timer";
// import Button from "@mui/material/Button";
// import { Typography } from "@mui/material";
// import { useRouter } from "next/navigation";

// export default function Page() {
//   const router = useRouter();

//   const sharedButtonSx = {
//     minWidth: { xs: 220, sm: 240, md: 260 },
//     px: { xs: 4, sm: 5 },
//     py: { xs: 1.5, sm: 1.75 },
//     borderRadius: "8px",
//     backgroundColor: "#ff3300",
//     color: "#ffffff",
//     fontWeight: "bold",
//     fontSize: { xs: "0.95rem", sm: "1rem" },
//     boxShadow:
//       "0 0 20px 4px rgba(255, 51, 0, 0.6), 0 0 40px 8px rgba(255, 100, 0, 0.4)",
//     textTransform: "uppercase",
//     transition: "all 0.3s ease-in-out",
//     "&:hover": {
//       backgroundColor: "#ff5500",
//       boxShadow:
//         "0 0 30px 8px rgba(255, 100, 0, 0.8), 0 0 60px 12px rgba(255, 150, 0, 0.6)",
//     },
//   };

//   return (
//     <div
//       className="relative min-h-screen flex flex-col"
//       style={{
//         backgroundImage: "url('/bg_image.png')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="absolute inset-0 bg-black/30 md:bg-black/50 z-10"></div>

//       <div className="flex flex-col items-center relative z-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24">
//         <div className="w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 lg:w-48 lg:h-28 xl:w-56 xl:h-32 mb-4 md:mb-6">
//           <CcsLogo className="w-full h-full" />
//         </div>

//         <h2 className="text-white text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px] font-megarok text-center leading-none tracking-wider drop-shadow-2xl mb-4 md:mb-6 lg:mb-8">
//           PRESENTS
//         </h2>

//         <h1 className="text-white text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] xl:text-[250px] font-megarok text-center leading-none tracking-wider drop-shadow-2xl mb-2">
//           OBSCURA
//         </h1>

//         {/* <ShiftingCountdown /> */}

//         <Button onClick={() => router.push("/Dashboard")} sx={sharedButtonSx}>
//           <Typography
//             fontFamily="GothamXNarrow"
//             fontWeight="bold"
//             fontSize={{ xs: "16px", sm: "18px" }}
//             textTransform="none"
//             textAlign="center"
//             width="100%"
//           >
//             Team Dashboard
//           </Typography>
//         </Button>

//         <Button
//           onClick={() => router.push("/register")}
//           sx={{ ...sharedButtonSx, mt: 2 }}
//         >
//           <Typography
//             fontFamily="GothamXNarrow"
//             fontWeight="bold"
//             fontSize={{ xs: "16px", sm: "18px" }}
//             textTransform="none"
//             textAlign="center"
//             width="100%"
//           >
//             Register Now
//           </Typography>
//         </Button>
//       </div>
//     </div>
//   );
// }

"use client";

import CcsLogo from "./_components/CcsLogo";
import ShiftingCountdown from "../components/ui/countdown-timer";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const sharedButtonSx = {
    minWidth: { xs: 220, sm: 240, md: 260 },
    px: { xs: 4, sm: 5 },
    py: { xs: 1.5, sm: 1.75 },
    borderRadius: "8px",
    backgroundColor: "#ff3300",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: { xs: "0.95rem", sm: "1rem" },
    boxShadow:
      "0 0 20px 4px rgba(255, 51, 0, 0.6), 0 0 40px 8px rgba(255, 100, 0, 0.4)",
    textTransform: "uppercase",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#ff5500",
      boxShadow:
        "0 0 30px 8px rgba(255, 100, 0, 0.8), 0 0 60px 12px rgba(255, 150, 0, 0.6)",
    },
  };

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

      <div className="absolute top-4 right-4 z-30">
        <Button onClick={() => router.push("/sponsors")}>
          <Typography
            color="white"
            fontFamily="GothamXNarrow"
            fontWeight="bold"
            fontSize={{ xs: "20px", sm: "20px" }}
            textTransform="none"
            textAlign="center"
            width="100%"
          >
            Our Sponsors
          </Typography>
        </Button>
      </div>

      <div className="flex flex-col items-center relative z-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24">
        <div className="w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 lg:w-48 lg:h-28 xl:w-56 xl:h-32 mb-4 md:mb-6">
          <CcsLogo className="w-full h-full" />
        </div>

        <h2 className="text-white text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px] font-megarok text-center leading-none tracking-wider drop-shadow-2xl mb-4 md:mb-6 lg:mb-8">
          PRESENTS
        </h2>

        <h1 className="text-white text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] xl:text-[250px] font-megarok text-center leading-none tracking-wider drop-shadow-2xl mb-2">
          OBSCURA
        </h1>

        {/* <ShiftingCountdown /> */}

        <Button onClick={() => router.push("/Dashboard")} sx={sharedButtonSx}>
          <Typography
            fontFamily="GothamXNarrow"
            fontWeight="bold"
            fontSize={{ xs: "16px", sm: "18px" }}
            textTransform="none"
            textAlign="center"
            width="100%"
          >
            Team Dashboard
          </Typography>
        </Button>

        <Button
          onClick={() => router.push("/register")}
          sx={{ ...sharedButtonSx, mt: 2 }}
        >
          <Typography
            fontFamily="GothamXNarrow"
            fontWeight="bold"
            fontSize={{ xs: "16px", sm: "18px" }}
            textTransform="none"
            textAlign="center"
            width="100%"
          >
            Register Now
          </Typography>
        </Button>
      </div>
    </div>
  );
}
