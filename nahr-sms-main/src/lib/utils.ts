import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { WaterStatusLevel } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateWaterStatus = (currentWater: number, dailyUsage: number) => {
  if (dailyUsage <= 0) {
    return { hoursRemaining: Infinity, level: 'safe' as WaterStatusLevel };
  }
  
  const hoursRemaining = (currentWater / dailyUsage) * 24;
  let level: WaterStatusLevel;

  if (hoursRemaining < 12) {
    level = 'critical';
  } else if (hoursRemaining < 24) {
    level = 'urgent';
  } else if (hoursRemaining < 48) {
    level = 'warning';
  } else {
    level = 'safe';
  }

  return { hoursRemaining, level };
};
