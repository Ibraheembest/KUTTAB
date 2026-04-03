# Implementation Plan: Student Management & Progress

**Branch**: `001-student-management` | **Date**: 2026-04-03 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/001-student-management/spec.md`

## Summary

Build the core student management and progress tracking module for Al-Kuttab Master. This covers student profiles, Halaqat (group) organization, daily attendance marking, Quran and Matn progress logging, and automatic XP calculation — all stored offline-first in a local SQLite database with full RTL/Arabic UI compliance.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)  
**Primary Dependencies**: React Native (Expo Managed Workflow), Expo SQLite (`expo-sqlite`), React Navigation v6, Zustand (state management), React Native Paper (UI components)  
**Storage**: SQLite (offline-first via `expo-sqlite`); UUIDs for all PKs, `updated_at` ISO 8601 on every record  
**Testing**: Jest + React Native Testing Library (unit/component), Detox (E2E)  
**Target Platform**: Android 10+ / iOS 15+ (cross-platform via Expo Managed)  
**Project Type**: Mobile App  
**Performance Goals**: Attendance screen renders 15-student list in <100ms; XP calculation completes synchronously on record save  
**Constraints**: Offline-capable at all times; no network dependency for core features; RTL-first layout  
**Scale/Scope**: Single teacher (moderator) operating 1–10 Halaqat with up to 50 students each

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **UX Philosophy**: Cairo font (18px min base) mandated in theme config; RTL forced via `I18nManager.forceRTL(true)` at app startup; no swipe gestures or animations in core data-entry flows.
- [x] **Data Integrity**: All entities use `uuid()` (from `expo-crypto`) as PK; `updated_at` timestamp on every row; SQLite is the single source of truth.
- [x] **Core Standards**: Leaderboard/XP views are Moderator-only screens; no student-facing achievement popups or public rankings.
- [x] **Atomic Design**: UI is decomposed — Atoms (Button, TextInput, Avatar), Molecules (StudentCard, AttendanceToggle, ProgressEntryField), Organisms (HalaqahRoster, DailyProgressForm).

✅ **All gates pass. Proceeding to Phase 0.**

## Project Structure

### Documentation (this feature)

```text
specs/001-student-management/
├── plan.md              ← This file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
├── contracts/           ← Phase 1 output
└── tasks.md             ← Phase 2 output (speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── atoms/
│   ├── Button.tsx
│   ├── TextInput.tsx
│   ├── Avatar.tsx
│   └── Badge.tsx
├── molecules/
│   ├── StudentCard.tsx
│   ├── AttendanceToggle.tsx
│   ├── ProgressEntryField.tsx
│   └── HalaqahSelector.tsx
├── organisms/
│   ├── HalaqahRoster.tsx
│   ├── DailyProgressForm.tsx
│   └── StudentProfileForm.tsx
├── screens/
│   ├── StudentsScreen.tsx
│   ├── HalaqatScreen.tsx
│   ├── AttendanceScreen.tsx
│   ├── ProgressScreen.tsx
│   └── LeaderboardScreen.tsx
├── store/
│   ├── studentsStore.ts
│   ├── halaqatStore.ts
│   ├── attendanceStore.ts
│   └── progressStore.ts
├── db/
│   ├── schema.ts
│   ├── migrations/
│   └── repositories/
│       ├── StudentRepository.ts
│       ├── HalaqahRepository.ts
│       ├── AttendanceRepository.ts
│       └── ProgressRepository.ts
└── utils/
    ├── xp.ts
    └── uuid.ts

tests/
├── unit/
│   ├── xp.test.ts
│   └── repositories/
└── components/
    ├── StudentCard.test.tsx
    └── AttendanceToggle.test.tsx
```

**Structure Decision**: Mobile app (Expo) with Atomic Design component hierarchy. Data layer uses Repository pattern over raw SQLite to keep business logic separate and testable.
