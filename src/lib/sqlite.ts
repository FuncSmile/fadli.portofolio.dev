import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

const dbPath = path.join(process.cwd(), "data", "contact.db");

let db: Database.Database | null = null;

function getDb() {
  if (db) return db;
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  return db;
}

export function saveContactMessage(payload: { name: string; email: string; message: string }) {
  const database = getDb();
  const stmt = database.prepare(
    "INSERT INTO contact_messages (name, email, message) VALUES (@name, @email, @message)"
  );
  const result = stmt.run(payload);
  return result.lastInsertRowid;
}
