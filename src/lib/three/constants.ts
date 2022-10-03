export const UNIT_TO_KM = 0.001;

// from: https://en.wikipedia.org/wiki/Lunar_distance_(astronomy)
const EARTH_MOON_DISTANCE = 384_399;
export const EARTH_MOON_UNITS = EARTH_MOON_DISTANCE * UNIT_TO_KM;

// from: https://en.wikipedia.org/wiki/Lunar_distance_(astronomy)
const SUN_EARTH_DISTANCE = 150_000_000;
export const SUN_EARTH_UNITS = SUN_EARTH_DISTANCE * UNIT_TO_KM;

export const SUN_MOON_UNITS = EARTH_MOON_UNITS + SUN_EARTH_UNITS;

export const RAYCASTER_CHANNEL = 3;

export const HELPER_LINES_COLOR = `hsl(${0}, ${0}%, ${75}%)`;

export const HELPER_GENERAL_SIZE = 10;
