
const games = [
  {
    name: "level-1",
    args: [],
    canvasResizePolicy: 2,
    executable: "syrinx_lvl1",
    experimentalVK: true,
    fileSizes: { "syrinx_lvl1.pck": 24219360, "syrinx_lvl1": 1758196 },
    focusCanvas: true,
    gdextensionLibs: [],
    serviceWorker: "syrinx_lvl1.service.worker.js",
    mainPack:"/level/syrinx_lvl1.pck",
  },
  {
    name: "level-2",
    args: [],
    canvasResizePolicy: 2,
    executable: "syrinx_lvl2",
    experimentalVK: true,
    fileSizes: { "syrinx_lvl2.pck": 24219360, "syrinx_lvl2": 1758196 },
    focusCanvas: true,
    gdextensionLibs: [],
    serviceWorker: "syrinx_lvl2.service.worker.js",
    mainPack:"/level/syrinx_lvl2.pck",
  },
   {
    name: "level-3",
    args: [],
    canvasResizePolicy: 2,
    executable: "level-3",
    experimentalVK: true,
    fileSizes: { "level-3.pck": 24219360, "level-3": 1758196 },
    focusCanvas: true,
    gdextensionLibs: [],
    serviceWorker: "level-3.service.worker.js",
    mainPack:"https://srinx-ccs.blr1.cdn.digitaloceanspaces.com/level-3.pck",
  },
];

export { games };


