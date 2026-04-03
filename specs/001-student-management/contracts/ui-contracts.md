# Internal UI Contracts: Student Management & Progress

**Feature**: `001-student-management`  
**Date**: 2026-04-03  
**Type**: Internal screen-to-repository contracts (mobile app has no external API)

---

## Contract: StudentRepository

Defines the interface between UI stores/screens and the SQLite data layer.

```typescript
interface StudentRepository {
  getAll(filter?: { status?: 'active' | 'archived' }): Promise<Student[]>;
  getById(id: string): Promise<Student | null>;
  create(data: CreateStudentInput): Promise<Student>;
  update(id: string, data: UpdateStudentInput): Promise<Student>;
  archive(id: string): Promise<void>;
  restore(id: string): Promise<void>;
}

interface CreateStudentInput {
  full_name: string;
  date_of_birth?: string;   // ISO 8601
  notes?: string;
}

interface UpdateStudentInput extends Partial<CreateStudentInput> {}
```

---

## Contract: HalaqahRepository

```typescript
interface HalaqahRepository {
  getAll(filter?: { status?: 'active' | 'archived' }): Promise<Halaqah[]>;
  getById(id: string): Promise<Halaqah | null>;
  getStudents(halaqahId: string, asOf?: string): Promise<Student[]>; // asOf = ISO date, defaults to today
  create(data: CreateHalaqahInput): Promise<Halaqah>;
  update(id: string, data: UpdateHalaqahInput): Promise<Halaqah>;
  addStudent(halaqahId: string, studentId: string): Promise<void>;
  transferStudent(studentId: string, fromHalaqahId: string, toHalaqahId: string, transferDate: string): Promise<void>;
}

interface CreateHalaqahInput {
  name: string;
  schedule_notes?: string;
}
```

---

## Contract: AttendanceRepository

```typescript
interface AttendanceRepository {
  getByHalaqahAndDate(halaqahId: string, date: string): Promise<AttendanceRecord[]>;
  getByStudent(studentId: string, from?: string, to?: string): Promise<AttendanceRecord[]>;
  upsert(data: UpsertAttendanceInput): Promise<AttendanceRecord>; // create or update for session_date
}

interface UpsertAttendanceInput {
  student_id: string;
  halaqah_id: string;
  session_date: string;       // YYYY-MM-DD
  status: 'present' | 'absent' | 'late';
  // xp_earned is calculated server-side from XP map — not passed by caller
}
```

---

## Contract: ProgressRepository

```typescript
interface ProgressRepository {
  getByStudent(studentId: string, from?: string, to?: string): Promise<ProgressSession[]>;
  create(data: CreateProgressInput): Promise<ProgressSession>;
}

interface CreateProgressInput {
  student_id: string;
  halaqah_id: string;
  session_date: string;
  subject: 'quran' | 'matn';
  // Quran fields (required if subject = 'quran')
  session_type?: 'hifz' | 'muraja_ah';
  surah_from?: number;
  ayah_from?: number;
  surah_to?: number;
  ayah_to?: number;
  page_from?: number;
  page_to?: number;
  // Matn fields (required if subject = 'matn')
  matn_book_name?: string;
  matn_progress_notes?: string;
}
```

---

## XP Constants Contract

```typescript
// src/utils/xp.ts
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

export function calculateAttendanceXP(status: AttendanceStatus): number;
export function calculateProgressXP(subject: 'quran' | 'matn', type?: 'hifz' | 'muraja_ah'): number;
```
