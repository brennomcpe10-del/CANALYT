import { ScheduleItem } from '../types';

export interface ScheduleLiveStatus {
  isLive: boolean;
  activeItem: ScheduleItem | null;
  startTime: Date | null;
  endTime: Date | null;
  minutesRemaining: number;
  secondsRemaining: number;
  nextItem: ScheduleItem | null;
}

/**
 * Normalizes day string to day index (0 = Domingo, 1 = Segunda, ..., 6 = Sábado)
 */
export function getDayIndex(dayStr: string): number | null {
  const normalized = dayStr.toLowerCase().trim();
  if (normalized.includes('hoje')) return new Date().getDay();
  if (normalized.includes('domingo')) return 0;
  if (normalized.includes('segunda')) return 1;
  if (normalized.includes('terça') || normalized.includes('terca')) return 2;
  if (normalized.includes('quarta')) return 3;
  if (normalized.includes('quinta')) return 4;
  if (normalized.includes('sexta')) return 5;
  if (normalized.includes('sábado') || normalized.includes('sabado')) return 6;
  return null;
}

/**
 * Parses start time from schedule item time string (e.g., "20:00 - 23:00", "20:00 BRT", "19:30")
 */
export function parseStartTime(timeStr: string): { hour: number; minute: number } {
  const match = timeStr.match(/(\d{1,2})[:hH](\d{2})/);
  if (match) {
    return {
      hour: parseInt(match[1], 10),
      minute: parseInt(match[2], 10)
    };
  }
  
  // Single hour match like "20h"
  const singleHourMatch = timeStr.match(/(\d{1,2})\s*h/i);
  if (singleHourMatch) {
    return {
      hour: parseInt(singleHourMatch[1], 10),
      minute: 0
    };
  }

  // Default fallback if no time format found
  return { hour: 20, minute: 0 };
}

/**
 * Checks if any scheduled item is currently live within its 1-hour window from start time.
 */
export function checkScheduleLiveStatus(
  schedule: ScheduleItem[],
  now: Date = new Date(),
  simulatedStartTime: Date | null = null
): ScheduleLiveStatus {
  // If streamer triggered a simulated test live
  if (simulatedStartTime) {
    const simEndTime = new Date(simulatedStartTime.getTime() + 60 * 60 * 1000); // 1 hour duration
    if (now >= simulatedStartTime && now < simEndTime) {
      const remainingMs = simEndTime.getTime() - now.getTime();
      const totalSec = Math.floor(remainingMs / 1000);
      return {
        isLive: true,
        activeItem: schedule[0] || null,
        startTime: simulatedStartTime,
        endTime: simEndTime,
        minutesRemaining: Math.floor(totalSec / 60),
        secondsRemaining: totalSec % 60,
        nextItem: null
      };
    }
  }

  const currentDayIndex = now.getDay();

  for (const item of schedule) {
    const itemDayIndex = getDayIndex(item.dayOfWeek);
    const isToday = item.isToday || (itemDayIndex !== null && itemDayIndex === currentDayIndex);

    if (isToday) {
      const { hour, minute } = parseStartTime(item.time);
      const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);
      
      // Live duration is EXACTLY 1 HOUR (60 minutes) from scheduled start time
      const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

      if (now >= startTime && now < endTime) {
        const remainingMs = endTime.getTime() - now.getTime();
        const totalSec = Math.floor(remainingMs / 1000);

        return {
          isLive: true,
          activeItem: item,
          startTime,
          endTime,
          minutesRemaining: Math.floor(totalSec / 60),
          secondsRemaining: totalSec % 60,
          nextItem: null
        };
      }
    }
  }

  return {
    isLive: false,
    activeItem: null,
    startTime: null,
    endTime: null,
    minutesRemaining: 0,
    secondsRemaining: 0,
    nextItem: schedule.find(s => s.isToday) || schedule[0] || null
  };
}
