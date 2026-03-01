import { createClient } from "@libsql/client";

export const turso = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

/**
 * Helper SQL untuk membuat tabel (bisa dijalankan via Turso CLI atau shell init)
 * 
 * CREATE TABLE IF NOT EXISTS projects (
 *   id INTEGER PRIMARY KEY AUTOINCREMENT,
 *   title TEXT NOT NULL,
 *   description TEXT NOT NULL,
 *   image_url TEXT NOT NULL,
 *   deploy_url TEXT,
 *   tech_stack TEXT NOT NULL
 * );
 * 
 * CREATE TABLE IF NOT EXISTS certificates (
 *   id INTEGER PRIMARY KEY AUTOINCREMENT,
 *   name TEXT NOT NULL,
 *   issuer TEXT NOT NULL,
 *   image_url TEXT NOT NULL,
 *   date TEXT NOT NULL
 * );
 *
 * CREATE TABLE IF NOT EXISTS experiences (
 *   id INTEGER PRIMARY KEY AUTOINCREMENT,
 *   company TEXT NOT NULL,
 *   role TEXT NOT NULL,
 *   location TEXT NOT NULL DEFAULT '',
 *   type TEXT NOT NULL DEFAULT 'Full-time',
 *   start_date TEXT NOT NULL,
 *   end_date TEXT,
 *   description TEXT NOT NULL DEFAULT '[]',
 *   skills TEXT NOT NULL DEFAULT ''
 * );
 */
