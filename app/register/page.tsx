// "use client";

// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import CCSLogoLarge from "../_components/CCSLogoLarge";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function RegisterPage() {
//   const router = useRouter();

//   useEffect(() => {
//     window.location.replace("https://obscura.ccstiet.com/");
//   }, []);

//   return (
//     <div className="relative h-screen w-full overflow-hidden bg-black text-white">
//       {/* Background pattern */}
//       <div className="absolute inset-0 z-0">
//         <div
//           className="w-full h-full bg-cover bg-center bg-no-repeat opacity-20"
//           style={{ backgroundImage: "url('/bg_image2.png')" }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80" />
//       </div>

//       {/* Header logo */}
//       <div className="absolute top-6 left-4 sm:left-8 z-10">
//         <CCSLogoLarge />
//       </div>

//       {/* Main content */}
//       <div className="relative z-10 flex justify-center items-center h-full px-6">
//         <div className="w-full max-w-md mx-auto text-center space-y-10">
//           <div className="space-y-2">
//             <h1
//               className="text-5xl sm:text-6xl font-extrabold tracking-widest"
//               style={{
//                 fontFamily: "Kdam Thmor Pro, monospace",
//                 textShadow: "0 0 10px #dc2626cc",
//               }}
//             >
//               REGISTER
//             </h1>
//             <Typography className="text-white/80 tracking-wide text-sm sm:text-base">
//               Join the resistance. Form your squad. Escape the Labyrinth.
//             </Typography>
//           </div>

//           <div className="flex flex-col space-y-6">
//             <Button
//               onClick={() => router.push("/Join")}
//               sx={{
//                 background: "linear-gradient(90deg, #991b1b, #dc2626)",
//                 width: "100%",
//                 maxWidth: "100%",
//                 height: "60px",
//                 borderRadius: "14px",
//                 border: "2px solid #991b1b",
//                 fontSize: "1.2rem",
//                 fontWeight: "bold",
//                 color: "white",
//                 fontFamily: "Kdam Thmor Pro, monospace",
//                 transition: "0.3s",
//                 boxShadow: "0 0 12px #dc262660",
//                 "&:hover": {
//                   background: "linear-gradient(90deg, #b91c1c, #ef4444)",
//                   transform: "translateY(-2px)",
//                   boxShadow: "0 0 20px #ef444480",
//                 },
//               }}
//             >
//               Join a Team
//             </Button>

//             <Button
//               onClick={() => router.push("/Add")}
//               sx={{
//                 background: "linear-gradient(90deg, #7f1d1d, #b91c1c)",
//                 width: "100%",
//                 maxWidth: "100%",
//                 height: "60px",
//                 borderRadius: "14px",
//                 border: "2px solid #7f1d1d",
//                 fontSize: "1.2rem",
//                 fontWeight: "bold",
//                 color: "white",
//                 fontFamily: "Kdam Thmor Pro, monospace",
//                 transition: "0.3s",
//                 boxShadow: "0 0 12px #b91c1c66",
//                 "&:hover": {
//                   background: "linear-gradient(90deg, #991b1b, #ef4444)",
//                   transform: "translateY(-2px)",
//                   boxShadow: "0 0 20px #ef4444aa",
//                 },
//               }}
//             >
//               Create a Team
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CCSLogoLarge from "../_components/CCSLogoLarge";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterPage() {
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
      if (data.registered) {
        router.push("/Dashboard");
      }
    } catch {
      alert("Failed to verify registration.");
    }
  };

  useEffect(() => {
    checkRegistered();
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url('/bg_image2.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80" />
      </div>

      {/* Header logo */}
      <div className="absolute top-6 left-4 sm:left-8 z-10">
        <CCSLogoLarge />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex justify-center items-center h-full px-6">
        <div className="w-full max-w-md mx-auto text-center space-y-10">
          <div className="space-y-2">
            <h1
              className="text-5xl sm:text-6xl font-extrabold tracking-widest"
              style={{
                fontFamily: "Kdam Thmor Pro, monospace",
                textShadow: "0 0 10px #dc2626cc",
              }}
            >
              REGISTER
            </h1>
            <Typography className="text-white/80 tracking-wide text-sm sm:text-base">
              Join the resistance. Form your squad. Escape the Labyrinth.
            </Typography>
          </div>

          <div className="flex flex-col space-y-6">
            <Button
              onClick={() => router.push("/Join")}
              sx={{
                background: "linear-gradient(90deg, #991b1b, #dc2626)",
                width: "100%",
                maxWidth: "100%",
                height: "60px",
                borderRadius: "14px",
                border: "2px solid #991b1b",
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "white",
                fontFamily: "Kdam Thmor Pro, monospace",
                transition: "0.3s",
                boxShadow: "0 0 12px #dc262660",
                "&:hover": {
                  background: "linear-gradient(90deg, #b91c1c, #ef4444)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 0 20px #ef444480",
                },
              }}
            >
              Join a Team
            </Button>

            {/* <Button
              onClick={() => router.push("/Add")}
              sx={{
                background: "linear-gradient(90deg, #7f1d1d, #b91c1c)",
                width: "100%",
                maxWidth: "100%",
                height: "60px",
                borderRadius: "14px",
                border: "2px solid #7f1d1d",
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "white",
                fontFamily: "Kdam Thmor Pro, monospace",
                transition: "0.3s",
                boxShadow: "0 0 12px #b91c1c66",
                "&:hover": {
                  background: "linear-gradient(90deg, #991b1b, #ef4444)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 0 20px #ef4444aa",
                },
              }}
            >
              Create a Team
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
