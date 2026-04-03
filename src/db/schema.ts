import * as SQLite from 'expo-sqlite';
import { runMigrations } from './migrations/runner';

export const DB_NAME = 'kuttabMaster.db';

let cachedDb: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (cachedDb) {
    return cachedDb;
  }
  
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  // Optional: Enable Write-Ahead Logging (WAL) mode for better performance
  // Note: expo-sqlite v13+ uses WAL mode by default, but we can explicitly set it or execute PRAGMAs.
  await db.execAsync('PRAGMA journal_mode = WAL;');
  await db.execAsync('PRAGMA foreign_keys = ON;');
  
  cachedDb = db;
  return db;
}

export async function initDatabase(): Promise<void> {
  const db = await getDatabase();
  await runMigrations(db);
}
