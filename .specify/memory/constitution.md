<!--
Sync Impact Report:
- Version change: Initial Draft → 1.0.0
- Modified principles: 
  - [PRINCIPLE_1_NAME] → I. Vision and User Persona
  - [PRINCIPLE_2_NAME] → II. Technical Architecture (The Nagdy Method)
  - [PRINCIPLE_3_NAME] → III. Data Integrity & Smart Merge Protocol
  - [PRINCIPLE_4_NAME] → IV. Core Functional Standards
  - [PRINCIPLE_5_NAME] → V. Development Workflow (SDD)
- Added sections: None
- Removed sections: [SECTION_2_NAME], [SECTION_3_NAME] 
- Templates requiring updates: 
  - ⚠ `.specify/templates/plan-template.md` (pending check for specific architecture rules, e.g., Nagdy Method)
  - ⚠ `.specify/templates/spec-template.md` (pending check for data merge and UX requirements)
  - ⚠ `.specify/templates/tasks-template.md` (pending check for Atomic Design task tracking)
- Follow-up TODOs: None
-->

# Al-Kuttab Master Constitution

## Core Principles

### I. Vision and User Persona
Primary User Profile: Quran teachers (Moderators) who are often senior citizens or prefer high-clarity interfaces.
UX Philosophy (وقار - Venerable Clarity):
- Typography: Use Cairo font exclusively with a minimum base size of 18px for readability.
- Visuals: High contrast ratios, large touch targets, and zero intrusive animations or complex gestures.
- Language: Native Arabic (RTL) is the mandatory primary interface.

### II. Technical Architecture (The Nagdy Method)
- Framework: React Native with Expo (Managed Workflow) for cross-platform stability.
- Language: Strict TypeScript for type safety and bug prevention.
- Storage Strategy: **Offline-First** using **SQLite** for all local persistence.
- Skill Integration: You MUST utilize the installed `antigravity-awesome-skills` library:
  - Use `@expo/skills` for all build and environment configurations.
  - Use `@frontend-design` for senior-friendly UI components.
  - Use `@brainstorming` before any new feature specification.

### III. Data Integrity & Smart Merge Protocol
- Unique Identification: Every database entry (Students, Attendance, Scores) MUST have a **UUID** as a primary key.
- Temporal Tracking: Every record MUST include an `updated_at` ISO 8601 timestamp.
- Smart Merge Logic (Last-Write-Wins): When importing JSON backup files, compare the `updated_at` timestamps of matching UUIDs. Merge new records and update existing ones only if the incoming data is newer; NEVER overwrite the entire database blindly.
- Portability: Support lightweight encrypted JSON export/import for manual data transfer between devices.

### IV. Core Functional Standards
- Assessment Engine: Flexible tracking for Quran (Surah, Ayah, Page) and Matn (Poetry).
- Gamification (Moderator View): Leaderboards and Mastery Maps are tools for the teacher to track performance, not for flashy student engagement.
- Reporting: Automated generation of PDF/Image summaries optimized for WhatsApp sharing.

### V. Development Workflow (SDD)
- Phases: Always follow the sequence: Constitution -> Specify -> Plan -> Tasks -> Implement.
- Atomic Design: Components must be broken down into the smallest reusable pieces (Atoms, Molecules, Organisms).
- Clean Code: Adhere to `@lint-and-validate` skills to ensure high-quality, professional code output.

## Governance
This Constitution supersedes all other practices and architectural decisions.
- **Amendment Procedure**: Any modifications to these principles must be proposed in documentation and ratified before implementation.
- **Versioning Policy**: The version number follows Semantic Versioning rules. Major bumps for breaking philosophical shifts, minor for adding rules, and patch for typos/clarifications.
- **Compliance Review Expectation**: All PRs, code reviews, and spec files MUST verify compliance against these principles. Code violating the "Venerable Clarity" or SQLite guidelines will be rejected. 

**Version**: 1.0.0 | **Ratified**: 2026-04-03 | **Last Amended**: 2026-04-03
