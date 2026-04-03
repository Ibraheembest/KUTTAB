# Phase 0 Research: Student Management & Progress

**Feature**: `001-student-management`  
**Date**: 2026-04-03  
**Status**: Complete — all unknowns resolved

---

## 1. Offline-First SQLite with Expo

**Decision**: Use `expo-sqlite` (v13+ / new API) with a single database file, schema versioned via a migrations table.

**Rationale**: `expo-sqlite` is the standard for Expo Managed Workflow offline persistence. The new API (v13+) supports synchronous WAL mode for lower latency writes, and is fully compatible with both iOS and Android without ejecting.

**Alternatives Considered**:
- **WatermelonDB**: More powerful but adds complexity and is harder to maintain for a single-teacher app at this scale.
- **AsyncStorage**: Key-value only; cannot handle relational queries (e.g., students by Halaqah + attendance by date).
- **Realm**: Excellent but adds ~5MB to bundle and requires native modules, complicating the Expo Managed build.

---

## 2. UUID Generation

**Decision**: Use `expo-crypto`'s `randomUUID()` for UUID v4 generation.

**Rationale**: Built into Expo SDK 49+, no extra dependency needed. Cryptographically secure and guaranteed unique for all primary keys, satisfying the Constitution's Data Integrity principle.

**Alternatives Considered**:
- `uuid` npm package: Works but requires polyfilling `getRandomValues` in Expo, adding unnecessary complexity.

---

## 3. State Management

**Decision**: Zustand with a thin repository layer (SQLite → Repository → Store → UI).

**Rationale**: Zustand is lightweight (~1KB), has no boilerplate, and integrates cleanly with React Native. The repository layer keeps all SQL queries isolated and unit-testable independently of UI state.

**Alternatives Considered**:
- **Redux Toolkit**: Overkill for a single-actor app. Significant boilerplate with no meaningful benefit.
- **React Context + useReducer**: Acceptable but state updates cascade unnecessarily across the component tree, hurting performance on older devices (target: senior teachers on mid-range Android phones).

---

## 4. RTL & Arabic Typography

**Decision**: Force RTL globally via `I18nManager.forceRTL(true)` in `App.tsx` on first launch (requires app restart, handled gracefully). Use Cairo font loaded via `expo-font`.

**Rationale**: React Native's RTL support is mature and `I18nManager.forceRTL` ensures all layout primitives (flexbox, text alignment, icons) mirror correctly without per-component overrides. Cairo is available in Google Fonts and supports full Arabic Unicode range.

**Alternatives Considered**:
- Per-screen RTL: Fragile and inconsistent — rejected.
- Noto Naskh Arabic: Valid but less readable for senior users at large sizes. Cairo's geometric clarity wins.

---

## 5. Fixed XP Values

**Decision**: XP values defined as a typed constant map in `src/utils/xp.ts`.

**Rationale**: Zero configuration for the teacher. Values are transparent in code and easy to adjust in future versions via a MINOR constitution amendment. Initial proposed mapping:

| Event | XP |
|---|---|
| Attendance: Present | 10 |
| Attendance: Late | 5 |
| New Hifz session logged | 50 |
| Muraja'ah session logged | 20 |
| Matn session logged | 30 |

**Alternatives Considered**:
- Database-driven config table: Adds a settings screen and migration complexity for v1 — deferred to v2.

---

## 6. Halaqah Transfer — Immutable History

**Decision**: Student transfers are recorded as a `HalaqahMembership` join table with `joined_at` and `left_at` timestamps. Attendance and Progress records reference `halaqah_id` at the time of recording — never updated retroactively.

**Rationale**: Satisfies FR-009 (Constitution-aligned immutable records) and enables future reporting by period, e.g., "show attendance for Fajr Circle, March 2026."

---

## 7. Component Testing Strategy

**Decision**: Jest + React Native Testing Library for unit/component tests; Detox reserved for critical E2E flows (mark attendance, log session).

**Rationale**: RNTL gives fast, stable component tests without a simulator. Detox E2E validates the "under 45 seconds" SC-001 acceptance criterion measurably.
