export const migration_001 = `
CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  date_of_birth TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  total_xp INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS halaqat (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  schedule_notes TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS halaqah_memberships (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL,
  halaqah_id TEXT NOT NULL,
  joined_at TEXT NOT NULL,
  left_at TEXT,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(student_id) REFERENCES students(id),
  FOREIGN KEY(halaqah_id) REFERENCES halaqat(id)
);

CREATE INDEX IF NOT EXISTS idx_halaqah_memberships_active ON halaqah_memberships(student_id, left_at);

CREATE TABLE IF NOT EXISTS attendance_records (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL,
  halaqah_id TEXT NOT NULL,
  session_date TEXT NOT NULL,
  status TEXT NOT NULL,
  xp_earned INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(student_id) REFERENCES students(id),
  FOREIGN KEY(halaqah_id) REFERENCES halaqat(id),
  UNIQUE(student_id, session_date)
);

CREATE TABLE IF NOT EXISTS progress_sessions (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL,
  halaqah_id TEXT NOT NULL,
  session_date TEXT NOT NULL,
  subject TEXT NOT NULL,
  session_type TEXT,
  surah_from INTEGER,
  ayah_from INTEGER,
  surah_to INTEGER,
  ayah_to INTEGER,
  page_from INTEGER,
  page_to INTEGER,
  matn_book_name TEXT,
  matn_progress_notes TEXT,
  xp_earned INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(student_id) REFERENCES students(id),
  FOREIGN KEY(halaqah_id) REFERENCES halaqat(id)
);
`;
