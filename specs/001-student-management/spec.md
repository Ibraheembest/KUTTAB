# Feature Specification: Student Management & Progress

**Feature Branch**: `001-student-management`  
**Created**: 2026-04-03  
**Status**: Draft  
**Input**: User description: "Build the core 'Student Management & Progress' feature for Al-Kuttab Master..."

## Clarifications

### Session 2026-04-03
- Q: Matn Tracking Data Format? → A: Simple free-text entry (Option A)
- Q: XP & Scoring Logic? → A: Fixed, hardcoded XP values for zero-configuration (Option A)
- Q: Student-Halaqah Transfer Policy? → A: Historical records stay linked to old Halaqah by date; student is active in new Halaqah from transfer date onward (Option B)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Manage Student Profiles (Priority: P1)

As a Quran teacher (Moderator), I want to easily add, view, and edit a student's basic profile so that I can keep an accurate register of the learners in my center.

**Why this priority**: Without core student records, none of the other features (attendance, progress) can function.

**Independent Test**: Can be fully tested by creating a dummy student, viewing their profile, modifying their name/age, and saving the changes. Delivers value by acting as a digital rolodex.

**Acceptance Scenarios**:

1. **Given** the teacher is on the Dashboard, **When** they add a new student with valid name and details, **Then** the student appears in the master roster.
2. **Given** an existing student profile, **When** the teacher edits the details, **Then** the changes are saved and reflected immediately.

---

### User Story 2 - Organize Halaqat (Groups) (Priority: P1)

As a teacher, I want to assign students to specific "Halaqat" (Circles) so that I can manage classrooms and bulk-track attendance by group.

**Why this priority**: Managing large numbers of students requires categorization, directly supporting the attendance user journey.

**Independent Test**: Can be mapped out and tested by creating a new Halaqah and assigning students to it.

**Acceptance Scenarios**:

1. **Given** multiple students exist, **When** the teacher creates a Halaqah named "Fajr Circle", **Then** the group is formed.
2. **Given** a Halaqah, **When** the teacher selects students to add to the group, **Then** they become part of that Halaqah roster.

---

### User Story 3 - Track Daily Attendance (Priority: P2)

As a teacher, I want a single, highly readable screen to quickly mark students in a Halaqah as present, absent, or late, so that I can maintain accurate records without wasting class time.

**Why this priority**: Attendance is the most frequent daily interaction, requiring minimal friction.

**Independent Test**: Can be tested by opening a group's daily view and toggling attendance states.

**Acceptance Scenarios**:

1. **Given** a Halaqah roster for the current day, **When** the teacher taps a student's attendance toggle, **Then** the status updates immediately.
2. **Given** an offline environment, **When** the teacher marks attendance, **Then** it is saved locally to process.

---

### User Story 4 - Log Quran and Matn Progress (Priority: P2)

As a teacher, I want to record what a student memorized or reviewed today (Quran: Surah, Ayah, Page; Matn: lines/poems) so I can ensure they are adhering to their curriculum.

**Why this priority**: This is the core educational tracking of the Al-Kuttab system.

**Independent Test**: Can be tested by selecting a student, entering testing data for Hifz/Muraja'ah, and saving the session.

**Acceptance Scenarios**:

1. **Given** a student's daily session, **When** the teacher inputs the Surah and Ayah range for new Hifz, **Then** the session is recorded in their history.
2. **Given** the Matn section, **When** the teacher updates the poetic lines memorized, **Then** the Matn progress is updated.

---

### User Story 5 - Automatic XP and Scoring (Priority: P3)

As a teacher, I want the system to calculate Experience Points (XP) based on attendance and recorded progress so I can use leaderboards to track performance objectively.

**Why this priority**: Adds gamification for the moderator's tracking tools, enhancing long-term engagement assessment.

**Independent Test**: Can be tested by logging an attendance and perfect Quran session, verifying the student's XP score increases accurately.

**Acceptance Scenarios**:

1. **Given** a student attends and completes a Hifz session, **When** the record is saved, **Then** the system automatically grants the baseline XP mapping.
2. **Given** a manual override need, **When** the teacher adjusts the XP, **Then** the manual score is recorded correctly.

### Edge Cases

- What happens when a teacher marks progress for a student they forgot to mark "Present"? The system should prompt the teacher to auto-mark the student as present before completing the session.
- When a student is transferred between Halaqat mid-term, their historical attendance and progress records remain linked to the old Halaqah by date. The student becomes active in the new Halaqah from the transfer date onward; no retroactive re-assignment occurs.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow adding, viewing, editing, and archiving student profiles.
- **FR-002**: System MUST allow grouping students into named Halaqat.
- **FR-003**: System MUST provide a daily attendance interface per Halaqah.
- **FR-004**: System MUST record Quran progress structured by Surah, Ayah, and Page.
- **FR-005**: System MUST distinguish between "New Hifz" and "Muraja'ah" in Quran tracking.
- **FR-006**: System MUST record Matn progress as a simple free-text entry field (e.g., Book Name and a progress description like "Lines 1-10").
- **FR-007**: System MUST assign numerical Scoring (XP) by mapping attendance and daily progress to predetermined, fixed XP values (no configuration needed by the teacher).
- **FR-008**: System MUST comply with the "Venerable Clarity" constitution (high contrast, >18px fonts, RTL priority).
- **FR-009**: When a student is transferred to a new Halaqah, the system MUST preserve all historical records under their original dates and Halaqah, and mark the student as active in the new Halaqah from the transfer date — without modifying or re-assigning past records.

### Key Entities

- **Student**: Basic details, total XP score, status.
- **Halaqah (Group)**: Name, schedule, assigned students.
- **AttendanceRecord**: Date, StudentID, Status (Present, Absent, Late).
- **ProgressSession**: Date, StudentID, Type (Hifz/Muraj), Subject (Quran/Matn), Range (Surahs/Ayahs), EarnedXP.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A teacher can record daily attendance for a 15-student Halaqah in under 45 seconds.
- **SC-002**: 100% of the UI screens for Student Management pass the "Venerable Clarity" readability checks without truncation.
- **SC-003**: A student's progress and XP updates instantly upon saving a session.
- **SC-004**: Teachers report high satisfaction (>4/5) with the simplicity of adding new students.

## Assumptions

- Offline-first rules from the Constitution apply implicitly; data saves locally via SQLite immediately.
- The standard Quran layout (114 Surahs, Standard Pages) is assumed for boundaries.
- Leaderboards are restricted to the Moderator/Teacher view as specified in the Constitution.
