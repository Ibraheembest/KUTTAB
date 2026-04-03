export type AttendanceStatus = 'present' | 'late' | 'absent';
export type ProgressSubject = 'quran' | 'matn';
export type QuranSessionType = 'hifz' | 'muraja_ah';

export const XP_MAP = {
  attendance: {
    present: 10,
    late: 5,
    absent: 0,
  },
  progress: {
    quran_hifz: 50,
    quran_muraja_ah: 20,
    matn: 30,
  },
} as const;

export function calculateAttendanceXP(status: AttendanceStatus): number {
  if (!(status in XP_MAP.attendance)) {
    throw new Error(`Unknown attendance status: ${status}`);
  }
  return XP_MAP.attendance[status];
}

export function calculateProgressXP(subject: 'matn'): number;
export function calculateProgressXP(subject: 'quran', type: QuranSessionType): number;
export function calculateProgressXP(subject: ProgressSubject, type?: QuranSessionType): number {
  if (subject === 'matn') {
    return XP_MAP.progress.matn;
  }
  if (subject === 'quran') {
    if (!type) {
      throw new Error("calculateProgressXP requires a 'type' when subject is 'quran'");
    }
    const key = `quran_${type}` as keyof typeof XP_MAP.progress;
    if (!(key in XP_MAP.progress)) {
      throw new Error(`Unknown quran session type: ${type}`);
    }
    return XP_MAP.progress[key];
  }
  throw new Error(`Unknown progress subject: ${subject}`);
}
