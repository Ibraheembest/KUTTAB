# Tasks: Student Management & Progress

**Input**: Design documents from `/specs/001-student-management/`  
**Branch**: `001-student-management`  
**Date**: 2026-04-03  
**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | contracts/ ✅

**Organization**: Tasks are grouped by user story for independent implementation, testing, and delivery.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the Expo project, enforce RTL/Arabic, configure Cairo font, and set up the base toolchain.

- [x] T001 Initialize Expo Managed Workflow project with TypeScript strict mode in repository root (`npx create-expo-app . --template expo-template-blank-typescript`)
- [x] T002 Install core dependencies: `expo-sqlite`, `expo-crypto`, `expo-font`, `zustand`, `react-native-paper`, `react-navigation/native`, `react-navigation/native-stack`
- [x] T003 [P] Configure ESLint + Prettier with TypeScript rules in `.eslintrc.js` and `.prettierrc`
- [x] T004 [P] Download and link Cairo font in `assets/fonts/` and configure `expo-font` loading in `src/hooks/useFonts.ts`
- [x] T005 Force RTL globally in `App.tsx` using `I18nManager.forceRTL(true)` with first-launch detection and reload
- [x] T006 Create global theme config in `src/theme/index.ts` with Cairo font family, 18px base size, high-contrast color palette, and Arabic RTL defaults
- [x] T007 [P] Set up Jest + React Native Testing Library in `jest.config.js` and `jest.setup.ts`
- [x] T008 Create base folder structure: `src/atoms/`, `src/molecules/`, `src/organisms/`, `src/screens/`, `src/store/`, `src/db/`, `src/db/repositories/`, `src/db/migrations/`, `src/utils/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: SQLite schema, migration runner, UUID utility, XP constants, and Navigation scaffold — all must be complete before any user story.

**⚠️ CRITICAL**: No user story implementation can begin until this phase is complete.

- [x] T009 Create SQLite database initializer in `src/db/schema.ts` with WAL mode enabled via `expo-sqlite`
- [x] T010 Implement migration runner in `src/db/migrations/runner.ts` that applies versioned SQL migration files in order
- [x] T011 [P] Create migration `001_initial_schema.sql` (or `ts`) in `src/db/migrations/` with tables: `students`, `halaqat`, `halaqah_memberships`, `attendance_records`, `progress_sessions`
- [x] T012 [P] Implement UUID utility `src/utils/uuid.ts` wrapping `expo-crypto.randomUUID()`
- [x] T013 [P] Implement XP constants and calculator in `src/utils/xp.ts` with exported `XP_MAP`, `calculateAttendanceXP()`, and `calculateProgressXP()` functions
- [x] T014 Implement base Repository helper in `src/db/repositories/BaseRepository.ts` with shared timestamp logic (`created_at`, `updated_at` ISO 8601 stamping)
- [x] T015 Set up React Navigation root stack in `src/navigation/RootNavigator.tsx` with screen definitions for StudentsScreen, HalaqatScreen, AttendanceScreen, ProgressScreen, LeaderboardScreen
- [x] T016 Create app entry point `App.tsx` that initializes database, loads fonts, forces RTL, and renders `RootNavigator`

**Checkpoint**: DB schema applied, navigation renders, XP utils pass unit tests — user story implementation can begin.

---

## Phase 3: User Story 1 — Manage Student Profiles (Priority: P1) 🎯 MVP

**Goal**: Teacher can add, view, edit, and archive student profiles from a clear Arabic/RTL interface.

**Independent Test**: Create a student → view them in roster → edit their name → archive them. All four actions complete without errors and data persists after app restart.

### Implementation for User Story 1

- [ ] T017 [P] [US1] Implement `StudentRepository` in `src/db/repositories/StudentRepository.ts` with `getAll()`, `getById()`, `create()`, `update()`, `archive()`, `restore()`
- [ ] T018 [P] [US1] Create `studentsStore.ts` in `src/store/studentsStore.ts` using Zustand, wired to `StudentRepository`
- [ ] T019 [P] [US1] Create `Avatar` atom in `src/atoms/Avatar.tsx` (circle with initials, Cairo font, high-contrast)
- [ ] T020 [P] [US1] Create `StudentCard` molecule in `src/molecules/StudentCard.tsx` (name, XP badge, status indicator, RTL layout)
- [ ] T021 [US1] Create `StudentProfileForm` organism in `src/organisms/StudentProfileForm.tsx` with fields: full name (required), date of birth (optional), notes (optional), Arabic labels, large touch targets
- [ ] T022 [US1] Implement `StudentsScreen` in `src/screens/StudentsScreen.tsx` with searchable list of active students using `StudentCard`, FAB for "Add Student"
- [ ] T023 [US1] Implement Add/Edit Student modal/screen wired to `StudentProfileForm` and `studentsStore`
- [ ] T024 [US1] Add archive/restore action on student profile with confirmation dialog (Arabic text, large buttons)

**Checkpoint**: US1 independently functional. Teacher can manage a complete student roster.

---

## Phase 4: User Story 2 — Organize Halaqat (Priority: P1)

**Goal**: Teacher can create Halaqat, name them in Arabic, and assign students to groups.

**Independent Test**: Create two Halaqat → assign 3 students to each → verify group rosters are correct independently.

### Implementation for User Story 2

- [ ] T025 [P] [US2] Implement `HalaqahRepository` in `src/db/repositories/HalaqahRepository.ts` with `getAll()`, `getById()`, `create()`, `update()`, `getStudents()`, `addStudent()`, `transferStudent()`
- [ ] T026 [P] [US2] Create `halaqatStore.ts` in `src/store/halaqatStore.ts` using Zustand, wired to `HalaqahRepository`
- [ ] T027 [P] [US2] Create `HalaqahSelector` molecule in `src/molecules/HalaqahSelector.tsx` (dropdown/picker with Arabic group names, RTL)
- [ ] T028 [US2] Implement `HalaqatScreen` in `src/screens/HalaqatScreen.tsx` with list of active Halaqat, FAB for "New Halaqah", tap to view members
- [ ] T029 [US2] Implement Add/Edit Halaqah screen wired to `halaqatStore` (name field, schedule notes)
- [ ] T030 [US2] Implement Student Assignment screen: list of all students with checkbox selection to add/remove from Halaqah, wired to `HalaqahRepository.addStudent()`
- [ ] T031 [US2] Implement Transfer Student flow: select student → choose new Halaqah → confirm → calls `HalaqahRepository.transferStudent()` which sets `left_at` on old membership and creates new row (FR-009)

**Checkpoint**: US1 + US2 functional. Full group management works.

---

## Phase 5: User Story 3 — Track Daily Attendance (Priority: P2)

**Goal**: Teacher can open a Halaqah's daily attendance screen and mark all students present/absent/late in under 45 seconds (SC-001).

**Independent Test**: Open AttendanceScreen for a Halaqah with 15 students → toggle 15 students to "Present" in under 45 seconds → close and reopen → values persist.

### Implementation for User Story 3

- [ ] T032 [P] [US3] Implement `AttendanceRepository` in `src/db/repositories/AttendanceRepository.ts` with `getByHalaqahAndDate()`, `getByStudent()`, `upsert()` (auto-calculates XP from `xp.ts`)
- [ ] T033 [P] [US3] Create `attendanceStore.ts` in `src/store/attendanceStore.ts` using Zustand, wired to `AttendanceRepository`
- [ ] T034 [P] [US3] Create `AttendanceToggle` molecule in `src/molecules/AttendanceToggle.tsx` — full-row touchable per student showing name + three-state toggle (Present 🟢 / Late 🟡 / Absent 🔴), Cairo 18px+, high-contrast, large touch target (min 56px height)
- [ ] T035 [US3] Implement `AttendanceScreen` in `src/screens/AttendanceScreen.tsx` using `HalaqahRoster` organism — selectable date (default: today), list of `AttendanceToggle` rows, auto-save on each toggle with SQLite `upsert`
- [ ] T036 [P] [US3] Create `HalaqahRoster` organism in `src/organisms/HalaqahRoster.tsx` — FlatList of attendance rows optimized for 50 students with `keyExtractor`, `getItemLayout` for fixed-height rows
- [ ] T037 [US3] Add "mark progress for absent student" guard: when teacher logs progress for a student with no attendance record for that day, prompt to auto-mark as Present before saving (Edge Case from spec)

**Checkpoint**: SC-001 satisfied. Attendance for 15-student Halaqah completable in <45 seconds.

---

## Phase 6: User Story 4 — Log Quran & Matn Progress (Priority: P2)

**Goal**: Teacher can record a student's daily Quran (Hifz/Muraja'ah with Surah/Ayah/Page) or Matn (free-text) session.

**Independent Test**: Select a student → log a Hifz session (Surah 2, Ayah 1–10) → log a Matn session ("الجزرية", "البيت 1-15") → verify both appear in student history.

### Implementation for User Story 4

- [ ] T038 [P] [US4] Implement `ProgressRepository` in `src/db/repositories/ProgressRepository.ts` with `getByStudent()`, `create()` (auto-calculates XP from `xp.ts`)
- [ ] T039 [P] [US4] Create `progressStore.ts` in `src/store/progressStore.ts` using Zustand, wired to `ProgressRepository`
- [ ] T040 [P] [US4] Create `ProgressEntryField` molecule in `src/molecules/ProgressEntryField.tsx` — conditional fields: Quran mode (subject selector, type selector Hifz/Muraja'ah, Surah pickers 1–114, Ayah/Page numbers) and Matn mode (book name text field, free-text progress notes), Arabic labels, RTL
- [ ] T041 [US4] Implement `DailyProgressForm` organism in `src/organisms/DailyProgressForm.tsx` — integrates `ProgressEntryField`, student selector, date picker, submit handler wired to `progressStore.create()`
- [ ] T042 [US4] Implement `ProgressScreen` in `src/screens/ProgressScreen.tsx` — student selector at top, scrollable history of past sessions by date, FAB to open `DailyProgressForm` modal
- [ ] T043 [US4] Add Quran range validation in `DailyProgressForm`: `surah_to >= surah_from`, Surah 1-114, Ayah >= 1 (from data-model validation rules)

**Checkpoint**: US4 functional. Teacher can record full progress sessions for both Quran and Matn.

---

## Phase 7: User Story 5 — XP & Leaderboard (Priority: P3)

**Goal**: XP updates automatically on save; teacher can view a Halaqah leaderboard sorted by total XP — Moderator-only view.

**Independent Test**: Log attendance (Present = 10 XP) + Hifz session (50 XP) for a student → verify total XP = 60 in their profile and on the Leaderboard.

### Implementation for User Story 5

- [ ] T044 [P] [US5] Create XP update trigger: after `AttendanceRepository.upsert()` and `ProgressRepository.create()`, recalculate student `total_xp` by summing all earned XP from both tables and updating `students.total_xp`
- [ ] T045 [P] [US5] Create `Badge` atom in `src/atoms/Badge.tsx` — rounded pill showing numeric XP, high-contrast gold/dark color, Cairo bold font
- [ ] T046 [US5] Implement `LeaderboardScreen` in `src/screens/LeaderboardScreen.tsx` — Halaqah-selector at top, ranked list of students sorted by `total_xp` descending, student rank number + name + XP badge, Cairo 18px+, RTL, Moderator-only access guard
- [ ] T047 [US5] Add XP manual override: on student profile screen, teacher can tap XP total to open an override dialog, enter a corrected total, and save directly to `students.total_xp`

**Checkpoint**: Full gamification loop functional. XP auto-calculates and leaderboard reflects live totals.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Finalize UX quality, error states, empty states, and constitution compliance checks.

- [ ] T048 [P] Add empty state illustrations/text (Arabic) to all list screens when no data exists (StudentsScreen, HalaqatScreen, AttendanceScreen, ProgressScreen, LeaderboardScreen)
- [ ] T049 [P] Implement error boundary in `src/components/ErrorBoundary.tsx` with Arabic user-friendly message and "Try Again" button
- [ ] T050 [P] Add loading skeleton screens for all FlatLists while SQLite data loads
- [ ] T051 Review and verify all font sizes ≥ 18px and all touch targets ≥ 56px tall (SC-002 validation — Venerable Clarity)
- [ ] T052 [P] Write unit tests for `src/utils/xp.ts` in `tests/unit/xp.test.ts` covering all XP_MAP values
- [ ] T053 [P] Write unit tests for `StudentRepository`, `AttendanceRepository`, `ProgressRepository` in `tests/unit/repositories/` using an in-memory SQLite instance
- [ ] T054 Run `quickstart.md` validation checklist end-to-end on a physical Android device
- [ ] T055 [P] Run ESLint + TypeScript strict check across all source files (`npx tsc --noEmit && npx eslint src/`)
- [ ] T056 Update `README.md` with project setup instructions, constitution overview, and feature list

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundation)**: Depends on Phase 1 — **BLOCKS all user stories**
- **Phase 3 (US1 Students)**: Requires Phase 2 complete — P1 priority, start first
- **Phase 4 (US2 Halaqat)**: Requires Phase 2 complete — P1 priority, can parallel US1
- **Phase 5 (US3 Attendance)**: Requires Phase 2 + US2 Halaqat (needs group IDs)
- **Phase 6 (US4 Progress)**: Requires Phase 2 + US1 Students (needs student IDs)
- **Phase 7 (US5 XP/Leaderboard)**: Requires US3 + US4 complete (needs XP data from both)
- **Phase 8 (Polish)**: Requires all user story phases complete

### Parallel Opportunities

All tasks marked `[P]` within the same phase can be executed concurrently by separate agents or developers.

---

## Parallel Example: Phase 2 (Foundation)

```
Parallel launch:
  T011 → Create initial_schema.sql
  T012 → Implement uuid.ts
  T013 → Implement xp.ts

Sequential after parallel:
  T009 → DB initializer (needs T011)
  T010 → Migration runner (needs T009)
  T014 → BaseRepository (needs T010)
  T015 → Navigation (independent, but good to have T009 done)
  T016 → App.tsx (needs T009, T015)
```

---

## Implementation Strategy

### MVP (User Story 1 Only — Phase 1–3)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundation (**critical gate**)
3. Complete Phase 3: US1 Student Profiles
4. **STOP and VALIDATE**: Teacher can manage complete student roster offline
5. Demo with real teacher — collect feedback before continuing

### Incremental Delivery

| Milestone | Phases | Delivers |
|---|---|---|
| MVP | 1–3 | Student roster management |
| v0.2 | + 4 | Halaqat / group management |
| v0.3 | + 5, 6 | Attendance + Progress tracking |
| v0.4 | + 7 | XP & Leaderboard |
| v1.0 | + 8 | Polish, tested, production-ready |

---

## Notes

- `[P]` = different files, no blocking dependencies within the phase
- `[USn]` = maps task to specific user story for traceability
- Each story phase is a complete, independently demoable increment
- All SQLite writes must include `updated_at` timestamps (Constitution: Data Integrity)
- All UI must pass RTL check before merging (Constitution: Venerable Clarity)
- Commit after completing each phase checkpoint
