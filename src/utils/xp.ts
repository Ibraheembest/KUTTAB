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
  return XP_MAP.attendance[status] || 0;
}

export function calculateProgressXP(subject: ProgressSubject, type?: QuranSessionType): number {
  if (subject === 'matn') {
    return XP_MAP.progress.matn;
  }
  if (subject === 'quran' && type) {
    if (type === 'hifz') return XP_MAP.progress.quran_hifz;
    if (type === 'muraja_ah') return XP_MAP.progress.quran_muraja_ah;
  }
  return 0;
}
