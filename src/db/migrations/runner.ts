import * as SQLite from 'expo-sqlite';
import { migration_001 } from './001_initial_schema';

const migrations = [
  { id: 1, name: '001_initial_schema', sql: migration_001 },
];

export async function runMigrations(db: SQLite.SQLiteDatabase): Promise<void> {
  // Create migrations table to track applied versions
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL
    );
  `);

  // Get currently applied migrations
  const result = await db.getAllAsync<{ id: number }>('SELECT id FROM migrations;');
  const appliedMigrationIds = new Set(result.map(row => row.id));

  // Run pending migrations
  for (const migration of migrations) {
    if (!appliedMigrationIds.has(migration.id)) {
      try {
        await db.withTransactionAsync(async () => {
          await db.execAsync(migration.sql);
          await db.runAsync(
            'INSERT INTO migrations (id, name, applied_at) VALUES (?, ?, ?)',
            migration.id,
            migration.name,
            new Date().toISOString()
          );
        });
        console.log(`Successfully applied migration: ${migration.name}`);
      } catch (error) {
        console.error(`Failed to apply migration: ${migration.name}`, error);
        throw error;
      }
    }
  }
}
