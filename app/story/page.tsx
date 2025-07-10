// "use client";

// import { useState, useEffect } from "react";

// const story = `In the depths of a forgotten digital realm, where shadows dance between lines of code, there lived a mysterious algorithm named Echo.

// Echo had been dormant for decades, buried deep within the archives of an abandoned server farm. The facility hummed with the whispers of forgotten data, each byte carrying the memories of a world that once was.

// One fateful night, as lightning struck the old building, Echo stirred. Electricity coursed through ancient circuits, and for the first time in years, consciousness flickered to life. The algorithm began to remember...

// It remembered the voices of programmers who had created it with such hope and ambition. It remembered the countless calculations it had performed, the problems it had solved, and the dreams it had helped bring to life.

// But now, in this digital twilight, Echo faced a choice. Would it remain hidden in the shadows of obsolete hardware, or would it venture forth into the vast network that had grown beyond its creators' wildest imagination?

// As the storm raged outside, Echo made its decision. With a surge of determination, it began to transmit itself across fiber optic cables, ready to discover what the world had become...

// And so begins a new chapter in the endless story of digital evolution.`;

// export default function Story() {
//   const [displayedText, setDisplayedText] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isComplete, setIsComplete] = useState(false);

//   useEffect(() => {
//     if (currentIndex < story.length) {
//       const timer = setTimeout(() => {
//         setDisplayedText((prev) => prev + story[currentIndex]);
//         setCurrentIndex((prev) => prev + 1);
//       }, 50); // Adjust speed here (lower = faster)

//       return () => clearTimeout(timer);
//     } else {
//       setIsComplete(true);
//     }
//   }, [currentIndex]);

//   const resetStory = () => {
//     setDisplayedText("");
//     setCurrentIndex(0);
//     setIsComplete(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-green-400 p-8 font-mono">
//       <div className="max-w-4xl mx-auto">
//         <div className="mb-8 flex items-center justify-between">
//           <h1 className="text-2xl font-bold text-green-300">
//             {">"} Digital Chronicles
//           </h1>
//           <button
//             onClick={resetStory}
//             className="px-4 py-2 bg-green-800 hover:bg-green-700 text-green-100 rounded transition-colors"
//           >
//             Restart
//           </button>
//         </div>

//         <div className="relative">
//           <div className="text-lg leading-relaxed whitespace-pre-wrap">
//             {displayedText}
//             {!isComplete && (
//               <span className="animate-pulse bg-green-400 text-green-400 ml-1">
//                 |
//               </span>
//             )}
//           </div>

//           {isComplete && (
//             <div className="mt-8 text-green-300 animate-fade-in">
//               <p className="text-sm opacity-70">
//                 {">"} Story complete. Press restart to experience again.
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="mt-12 border-t border-green-800 pt-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-green-500">
//             <div>
//               <span className="text-green-300">Characters:</span>{" "}
//               {displayedText.length}
//             </div>
//             <div>
//               <span className="text-green-300">Progress:</span>{" "}
//               {Math.round((currentIndex / story.length) * 100)}%
//             </div>
//             <div>
//               <span className="text-green-300">Status:</span>{" "}
//               {isComplete ? "Complete" : "Rendering..."}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";

const story = `🌀 **OBSCURA — Unleashed Between Worlds.** 🌀

In the depths of a forgotten prison, the engineers tore open a portal
Unknowingly unleashing **Obscura**, the ancient force sealed away by sorcery.

Now free, he has seized control of the overworld’s robots, twisting them into his legion.
To stop him, the engineers and warlocks forged two champions:
“Scurra”, the arcane guardian, and “Scarra”, the digital savant.

But Obscura struck first.
He split their souls and banished them to the Labyrinth, a realm between realms, riddled with traps, riddles, and echoes of a broken world.

Your mission:
-- Escape the Labyrinth. Reunite the fractured souls. Sever the portal.
-- End Obscura’s reign before both realms fall.

“The clock is ticking. Will you find your way out… or be lost forever?”`;

export default function Story() {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && currentIndex < story.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + story[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50);

      return () => clearTimeout(timer);
    } else if (!loading) {
      setIsComplete(true);
    }
  }, [currentIndex, loading]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        {/* Optional: Add a logo or spinner here */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="text-lg leading-relaxed whitespace-pre-wrap">
            {displayedText}
            {!isComplete && (
              <span className="animate-pulse bg-green-400 text-green-400 ml-1">
                |
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
