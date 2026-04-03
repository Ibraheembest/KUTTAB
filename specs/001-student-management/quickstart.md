# Developer Quickstart: Student Management & Progress

**Feature**: `001-student-management`  
**Date**: 2026-04-03

---

## Prerequisites

- Node.js 20+
- Expo CLI: `npm install -g expo-cli`
- EAS CLI (for builds): `npm install -g eas-cli`
- Android Studio or Xcode (for simulators)

---

## Project Setup

```bash
# Clone and install
cd D:\KUTTAB
npm install

# Start Expo dev server
npx expo start

# Run on Android emulator
npx expo run:android

# Run on iOS simulator
npx expo run:ios
```

---

## Key Files for This Feature

| File | Purpose |
|---|---|
| `src/db/schema.ts` | SQLite table definitions & migrations |
| `src/db/repositories/StudentRepository.ts` | Student CRUD |
| `src/db/repositories/HalaqahRepository.ts` | Halaqah CRUD + transfer logic |
| `src/db/repositories/AttendanceRepository.ts` | Attendance upsert |
| `src/db/repositories/ProgressRepository.ts` | Progress session logging |
| `src/utils/xp.ts` | Fixed XP constants & calculation |
| `src/store/studentsStore.ts` | Zustand store for student state |
| `src/screens/AttendanceScreen.tsx` | Critical path: daily attendance UI |

---

## Database Setup

The database is initialized on first app launch. The schema is applied automatically via the migrations runner in `src/db/schema.ts`. No manual setup required.

---

## RTL Setup

RTL is forced globally in `App.tsx`:

```typescript
import { I18nManager } from 'react-native';
if (!I18nManager.isRTL) {
  I18nManager.forceRTL(true);
  // Reload app once after first launch to apply
}
```

---

## Running Tests

```bash
# Unit + component tests
npx jest

# Watch mode
npx jest --watch

# Single file
npx jest src/utils/xp.test.ts
```

---

## XP Calculation

XP is calculated at record save time using the constant map in `src/utils/xp.ts`. No user input required — the system resolves XP automatically based on attendance status and progress session type.

```typescript
import { calculateAttendanceXP, calculateProgressXP } from '@/utils/xp';

// Example
const xp = calculateAttendanceXP('present'); // → 10
const sessionXp = calculateProgressXP('quran', 'hifz'); // → 50
```
