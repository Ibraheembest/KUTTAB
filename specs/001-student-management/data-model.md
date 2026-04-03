# Data Model: Student Management & Progress

**Feature**: `001-student-management`  
**Date**: 2026-04-03

---

## Entities & Schema

All tables follow Constitution rules: UUID primary key, `updated_at` ISO 8601, `created_at` timestamp.

---

### `students`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | TEXT (UUID v4) | PRIMARY KEY | `randomUUID()` |
| `full_name` | TEXT | NOT NULL | Student's full name (Arabic) |
| `date_of_birth` | TEXT | NULLABLE | ISO 8601 date string |
| `notes` | TEXT | NULLABLE | Free-text teacher notes |
| `status` | TEXT | NOT NULL, DEFAULT 'active' | `'active'` or `'archived'` |
| `total_xp` | INTEGER | NOT NULL, DEFAULT 0 | Calculated running total |
| `created_at` | TEXT | NOT NULL | ISO 8601 timestamp |
| `updated_at` | TEXT | NOT NULL | ISO 8601 timestamp |

---

### `halaqat`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | TEXT (UUID v4) | PRIMARY KEY | |
| `name` | TEXT | NOT NULL | e.g., "حلقة الفجر" |
| `schedule_notes` | TEXT | NULLABLE | Free-text schedule description |
| `status` | TEXT | NOT NULL, DEFAULT 'active' | `'active'` or `'archived'` |
| `created_at` | TEXT | NOT NULL | |
| `updated_at` | TEXT | NOT NULL | |

---

### `halaqah_memberships`

Join table capturing the full lifecycle of a student's membership in a Halaqah, supporting mid-term transfers (FR-009).

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | TEXT (UUID v4) | PRIMARY KEY | |
| `student_id` | TEXT | NOT NULL, FK → students.id | |
| `halaqah_id` | TEXT | NOT NULL, FK → halaqat.id | |
| `joined_at` | TEXT | NOT NULL | ISO 8601 date |
| `left_at` | TEXT | NULLABLE | NULL = currently active member |
| `updated_at` | TEXT | NOT NULL | |

**Index**: `(student_id, left_at)` for fast "current Halaqah" lookup.

---

### `attendance_records`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | TEXT (UUID v4) | PRIMARY KEY | |
| `student_id` | TEXT | NOT NULL, FK → students.id | |
| `halaqah_id` | TEXT | NOT NULL, FK → halaqat.id | Snapshot of Halaqah at time of record |
| `session_date` | TEXT | NOT NULL | ISO 8601 date (YYYY-MM-DD) |
| `status` | TEXT | NOT NULL | `'present'`, `'absent'`, `'late'` |
| `xp_earned` | INTEGER | NOT NULL, DEFAULT 0 | Calculated at save time from XP map |
| `created_at` | TEXT | NOT NULL | |
| `updated_at` | TEXT | NOT NULL | |

**Unique Constraint**: `(student_id, session_date)` — one record per student per day.

---

### `progress_sessions`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | TEXT (UUID v4) | PRIMARY KEY | |
| `student_id` | TEXT | NOT NULL, FK → students.id | |
| `halaqah_id` | TEXT | NOT NULL, FK → halaqat.id | Snapshot at time of record |
| `session_date` | TEXT | NOT NULL | ISO 8601 date |
| `subject` | TEXT | NOT NULL | `'quran'` or `'matn'` |
| `session_type` | TEXT | NULLABLE | `'hifz'` or `'muraja'ah'` (Quran only) |
| `surah_from` | INTEGER | NULLABLE | Surah number (1–114), Quran only |
| `ayah_from` | INTEGER | NULLABLE | Quran only |
| `surah_to` | INTEGER | NULLABLE | Quran only |
| `ayah_to` | INTEGER | NULLABLE | Quran only |
| `page_from` | INTEGER | NULLABLE | Quran only |
| `page_to` | INTEGER | NULLABLE | Quran only |
| `matn_book_name` | TEXT | NULLABLE | Matn only: name of the book/poem |
| `matn_progress_notes` | TEXT | NULLABLE | Matn only: free-text progress description |
| `xp_earned` | INTEGER | NOT NULL, DEFAULT 0 | From XP map at save time |
| `created_at` | TEXT | NOT NULL | |
| `updated_at` | TEXT | NOT NULL | |

---

## State Transitions

### Student Status
```
active ──(teacher archives)──► archived
archived ──(teacher restores)──► active
```

### Halaqah Membership (Transfer)
```
joined_at set, left_at = NULL  →  Active member
left_at set to transfer date   →  New membership row created for new Halaqah
```

---

## Validation Rules

| Rule | Description |
|---|---|
| Student `full_name` | Required, min 2 characters |
| `session_date` | Cannot be in the future |
| Quran: `surah_from` | Must be between 1 and 114 |
| Quran: `ayah_from` | Must be ≥ 1 |
| `surah_to` ≥ `surah_from` | Enforced at application layer |
| One attendance per student per day | Enforced by UNIQUE constraint |
| Matn `matn_book_name` | Required if `subject = 'matn'` |
