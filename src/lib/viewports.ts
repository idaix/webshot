export const VIEWPORTS = {
  aspectRatios: {
    "16:9": { width: 1920, height: 1080, deviceScaleFactor: 2 }, // Full HD, most common for desktops and laptops
    "21:9": { width: 2560, height: 1080, deviceScaleFactor: 2 }, // Ultrawide monitors
    "32:9": { width: 3840, height: 1080, deviceScaleFactor: 2 }, // Super ultrawide
    "4:3": { width: 768, height: 1024, deviceScaleFactor: 2 }, // Tablets, some laptops
    "3:2": { width: 1440, height: 960, deviceScaleFactor: 2 }, // Surface devices, some laptops
    "9:16": { width: 360, height: 640, deviceScaleFactor: 2 }, // Mobile portrait (e.g., iPhone, Android)
    "3:4": { width: 600, height: 800, deviceScaleFactor: 2 }, // Smaller tablets or portrait tablets
  },

  // Common device-specific viewports
  devices: {
    mobile: {
      iPhone14: { width: 390, height: 844, deviceScaleFactor: 3 }, // iPhone 14
      galaxyS23: { width: 360, height: 800, deviceScaleFactor: 3 }, // Samsung Galaxy S23
    },
    tablet: {
      iPad: { width: 834, height: 1194, deviceScaleFactor: 2 }, // iPad Air/Pro
      surfacePro: { width: 1440, height: 960, deviceScaleFactor: 2 }, // Surface Pro
    },
    desktop: {
      HD: { width: 1366, height: 768, deviceScaleFactor: 1 }, // Common laptop resolution
      FullHD: { width: 1920, height: 1080, deviceScaleFactor: 2 }, // Standard desktop
      "4K": { width: 3840, height: 2160, deviceScaleFactor: 2 }, // High-end monitors
    },
  },
};

export const aspectRatioKeys = Object.keys(VIEWPORTS.aspectRatios) as [
  string,
  ...string[]
];
